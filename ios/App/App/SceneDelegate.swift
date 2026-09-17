import UIKit
import Capacitor
import WebKit

/// Capacitor enables separate media playback on the receiver by default. During
/// iPhone Screen Mirroring, an HTML video can then take over the receiver and
/// leave the rest of the application frozen on its last frame. Disable that
/// route before WKWebView is created so the full app stays mirrored.
final class MajlisBridgeViewController: CAPBridgeViewController {
    override open func webViewConfiguration(for instanceConfiguration: InstanceConfiguration) -> WKWebViewConfiguration {
        let configuration = super.webViewConfiguration(for: instanceConfiguration)
        configuration.allowsAirPlayForMediaPlayback = false
        configuration.allowsPictureInPictureMediaPlayback = false

        let mediaRouteLock = WKUserScript(
            source: """
            (() => {
              const lockVideo = video => {
                if (!(video instanceof HTMLVideoElement)) return;
                video.setAttribute('playsinline', '');
                video.setAttribute('webkit-playsinline', '');
                video.setAttribute('x-webkit-airplay', 'deny');
                try { video.disableRemotePlayback = true; } catch (_) {}
              };
              const lockAll = root => {
                if (!root) return;
                if (root instanceof HTMLVideoElement) lockVideo(root);
                root.querySelectorAll?.('video').forEach(lockVideo);
              };
              lockAll(document);
              new MutationObserver(records => {
                records.forEach(record => record.addedNodes.forEach(lockAll));
              }).observe(document.documentElement, { childList: true, subtree: true });
            })();
            """,
            injectionTime: .atDocumentEnd,
            forMainFrameOnly: false
        )
        configuration.userContentController.addUserScript(mediaRouteLock)
        return configuration
    }
}

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        if !(window?.rootViewController is MajlisBridgeViewController) {
            let appWindow = window ?? UIWindow(windowScene: windowScene)
            appWindow.rootViewController = MajlisBridgeViewController()
            window = appWindow
        }
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}
