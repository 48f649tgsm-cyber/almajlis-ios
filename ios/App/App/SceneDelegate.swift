import UIKit
import Capacitor
import WebKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?
    private weak var bridgeViewController: CAPBridgeViewController?
    private var captureObserver: NSObjectProtocol?
    private var lastAppliedCaptureState: Bool?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        let bridgeViewController = CAPBridgeViewController()
        self.bridgeViewController = bridgeViewController

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = bridgeViewController
        window?.makeKeyAndVisible()

        captureObserver = NotificationCenter.default.addObserver(
            forName: UIScreen.capturedDidChangeNotification,
            object: windowScene.screen,
            queue: .main
        ) { [weak self] _ in
            self?.applyAirPlayCompatibilityMode(force: true)
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

    func sceneDidDisconnect(_ scene: UIScene) {
        if let captureObserver {
            NotificationCenter.default.removeObserver(captureObserver)
            self.captureObserver = nil
        }
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

        let isMirroring = screen.isCaptured
        // Normal play must be a strict no-op. Cleanup is needed only after a
        // mirroring session had previously enabled the compatibility layer.
        if !isMirroring, lastAppliedCaptureState != true {
            lastAppliedCaptureState = false
            return
        }
        if !force, lastAppliedCaptureState == isMirroring { return }
        lastAppliedCaptureState = isMirroring

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
              style.textContent = `
                html.majlis-airplay-mode *,
                html.majlis-airplay-mode *::before,
                html.majlis-airplay-mode *::after {
                  -webkit-backdrop-filter: none !important;
                  backdrop-filter: none !important;
                  will-change: auto !important;
                  mix-blend-mode: normal !important;
                }
                html.majlis-airplay-mode .homeAtmosphere *,
                html.majlis-airplay-mode .ambientGlow,
                html.majlis-airplay-mode body::before,
                html.majlis-airplay-mode body::after {
                  animation: none !important;
                  filter: none !important;
                }
                html.majlis-airplay-mode #cats #t1,
                html.majlis-airplay-mode #cats #t2,
                html.majlis-airplay-mode .categoryBox {
                  transform: none !important;
                }
              `;
              document.head.appendChild(style);
            }
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

        webView.evaluateJavaScript(javaScript, completionHandler: nil)
    }

    private func findWebView(in view: UIView) -> WKWebView? {
        if let webView = view as? WKWebView { return webView }
        for subview in view.subviews {
            if let webView = findWebView(in: subview) { return webView }
        }
        return nil
    }
}
