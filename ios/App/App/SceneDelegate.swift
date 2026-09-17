import UIKit
import Capacitor
import WebKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?
    private weak var bridgeViewController: CAPBridgeViewController?
    private var captureObserver: NSObjectProtocol?
    private var captureStateTimer: Timer?
    private var lastAppliedCaptureState: Bool?
    private var mirrorFrameTimer: Timer?
    private weak var mirrorFrameView: UIImageView?
    private var mirrorSnapshotInFlight = false

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        // Info.plist already points this scene at Main.storyboard. Reuse the
        // bridge controller created by UIKit instead of stacking a second
        // WKWebView/window on top of it. Keep a programmatic fallback for builds
        // where the storyboard has not supplied the controller.
        let bridgeViewController: CAPBridgeViewController
        if let storyboardBridge = window?.rootViewController as? CAPBridgeViewController {
            bridgeViewController = storyboardBridge
        } else {
            bridgeViewController = CAPBridgeViewController()
            let appWindow = window ?? UIWindow(windowScene: windowScene)
            appWindow.rootViewController = bridgeViewController
            window = appWindow
        }
        self.bridgeViewController = bridgeViewController
        window?.makeKeyAndVisible()

        captureObserver = NotificationCenter.default.addObserver(
            forName: UIScreen.capturedDidChangeNotification,
            object: windowScene.screen,
            queue: .main
        ) { [weak self] _ in
            self?.applyAirPlayCompatibilityMode(force: true)
        }

        // UIScreen.isCaptured is deprecated and can miss AirPlay changes on
        // current iOS releases. Poll the scene capture trait instead; this
        // performs no web work while the state is unchanged.
        captureStateTimer = Timer.scheduledTimer(withTimeInterval: 0.75, repeats: true) { [weak self] _ in
            self?.applyAirPlayCompatibilityMode()
        }

        // The local Capacitor page can finish loading after the scene is shown.
        // These one-shot checks apply the state without adding a permanent timer.
        [0.5, 1.5, 3.0].forEach { delay in
            DispatchQueue.main.asyncAfter(deadline: .now() + delay) { [weak self] in
                self?.applyAirPlayCompatibilityMode(force: true)
            }
        }

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        applyAirPlayCompatibilityMode(force: true)
    }

    func sceneWillResignActive(_ scene: UIScene) {
        // Do not leave a high-frequency snapshot task running while Control
        // Center or another app has made this scene inactive.
        stopNativeMirrorFramePump()
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        stopNativeMirrorFramePump()
    }

    func sceneDidDisconnect(_ scene: UIScene) {
        if let captureObserver {
            NotificationCenter.default.removeObserver(captureObserver)
            self.captureObserver = nil
        }
        captureStateTimer?.invalidate()
        captureStateTimer = nil
        stopNativeMirrorFramePump()
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }

    private func applyAirPlayCompatibilityMode(force: Bool = false) {
        guard let screen = window?.windowScene?.screen,
              let rootView = bridgeViewController?.view,
              let webView = findWebView(in: rootView) else { return }

        let isMirroring: Bool
        if #available(iOS 17.0, *) {
            // sceneCaptureState is Apple's current API. Keep the two legacy
            // signals as fallbacks because some AirPlay receivers report the
            // scene trait one run-loop later than the physical screen state.
            isMirroring = window?.traitCollection.sceneCaptureState == .active
                || screen.isCaptured
                || UIScreen.screens.count > 1
        } else {
            isMirroring = screen.isCaptured
        }
        // Normal play must be a strict no-op. Cleanup is needed only after a
        // mirroring session had previously enabled the compatibility layer.
        if !isMirroring, lastAppliedCaptureState != true {
            lastAppliedCaptureState = false
            return
        }
        if !force, lastAppliedCaptureState == isMirroring { return }
        lastAppliedCaptureState = isMirroring

        if !isMirroring {
            stopNativeMirrorFramePump()
        }

        let javaScript = """
        (() => {
          const active = \(isMirroring ? "true" : "false");
          const root = document.documentElement;
          const styleId = 'majlis-airplay-compatibility-style';
          let style = document.getElementById(styleId);

          if (active) {
            if (!style) {
              style = document.createElement('style');
              style.id = styleId;
              document.head.appendChild(style);
            }
            style.textContent = `
                html.majlis-airplay-mode *,
                html.majlis-airplay-mode *::before,
                html.majlis-airplay-mode *::after {
                  -webkit-backdrop-filter: none !important;
                  backdrop-filter: none !important;
                  filter: none !important;
                  will-change: auto !important;
                  mix-blend-mode: normal !important;
                  animation: none !important;
                  transition: none !important;
                }
                html.majlis-airplay-mode #cats #t1,
                html.majlis-airplay-mode #cats #t2,
                html.majlis-airplay-mode .categoryBox {
                  transform: none !important;
                }
              `;
            root.classList.add('majlis-airplay-mode');
          } else {
            root.classList.remove('majlis-airplay-mode');
            if (style) style.remove();
          }

          // Recalculate the current layout once; game logic and timers remain untouched.
          void root.offsetHeight;
          window.dispatchEvent(new Event('resize'));
        })();
        """

        webView.evaluateJavaScript(javaScript) { [weak self, weak webView] _, _ in
            guard let self, let webView, self.lastAppliedCaptureState == true else { return }
            self.startNativeMirrorFramePump(for: webView)
        }
        // Do not depend solely on JavaScript completion: a busy WebKit process
        // may delay that callback, which is exactly the condition this fallback
        // is designed to bypass.
        if isMirroring {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) { [weak self, weak webView] in
                guard let self, let webView, self.lastAppliedCaptureState == true else { return }
                self.startNativeMirrorFramePump(for: webView)
            }
        }
    }

    // WKWebView uses a separately composited WebKit surface. On affected iOS /
    // AirPlay combinations that surface can remain frozen on the receiver even
    // though JavaScript and touch handling continue normally on the iPhone.
    // While mirroring only, copy the current web frame into a native UIImageView.
    // AirPlay then receives a normal UIKit layer. The image view ignores touches,
    // and the entire pump is removed as soon as mirroring stops.
    private func startNativeMirrorFramePump(for webView: WKWebView) {
        if mirrorFrameView == nil, let container = webView.superview {
            let frameView = UIImageView(frame: webView.frame)
            frameView.translatesAutoresizingMaskIntoConstraints = false
            frameView.contentMode = .scaleToFill
            frameView.clipsToBounds = true
            frameView.backgroundColor = webView.isOpaque ? .white : .clear
            frameView.isUserInteractionEnabled = false
            frameView.accessibilityElementsHidden = true
            frameView.isHidden = true
            container.addSubview(frameView)
            NSLayoutConstraint.activate([
                frameView.leadingAnchor.constraint(equalTo: webView.leadingAnchor),
                frameView.trailingAnchor.constraint(equalTo: webView.trailingAnchor),
                frameView.topAnchor.constraint(equalTo: webView.topAnchor),
                frameView.bottomAnchor.constraint(equalTo: webView.bottomAnchor)
            ])
            mirrorFrameView = frameView
        }

        guard mirrorFrameTimer == nil else { return }
        captureNativeMirrorFrame(from: webView)
        let timer = Timer(timeInterval: 1.0 / 10.0, repeats: true) { [weak self, weak webView] _ in
            guard let self, let webView else { return }
            self.captureNativeMirrorFrame(from: webView)
        }
        mirrorFrameTimer = timer
        RunLoop.main.add(timer, forMode: .common)
    }

    private func captureNativeMirrorFrame(from webView: WKWebView) {
        guard lastAppliedCaptureState == true,
              mirrorFrameView != nil,
              !mirrorSnapshotInFlight,
              !webView.bounds.isEmpty else { return }

        mirrorSnapshotInFlight = true
        let configuration = WKSnapshotConfiguration()
        configuration.afterScreenUpdates = true
        let displayScale = webView.window?.screen.scale ?? UIScreen.main.scale
        let nativeWidth = webView.bounds.width * displayScale
        configuration.snapshotWidth = NSNumber(value: Double(min(1600.0, nativeWidth)))

        webView.takeSnapshot(with: configuration) { [weak self] image, _ in
            guard let self else { return }
            self.mirrorSnapshotInFlight = false
            guard self.lastAppliedCaptureState == true, let image else { return }
            self.mirrorFrameView?.image = image
            self.mirrorFrameView?.isHidden = false
            self.mirrorFrameView?.layer.setNeedsDisplay()
        }
    }

    private func stopNativeMirrorFramePump() {
        mirrorFrameTimer?.invalidate()
        mirrorFrameTimer = nil
        mirrorSnapshotInFlight = false
        mirrorFrameView?.removeFromSuperview()
        mirrorFrameView = nil
    }

    private func findWebView(in view: UIView) -> WKWebView? {
        if let webView = view as? WKWebView { return webView }
        for subview in view.subviews {
            if let webView = findWebView(in: subview) { return webView }
        }
        return nil
    }
}
