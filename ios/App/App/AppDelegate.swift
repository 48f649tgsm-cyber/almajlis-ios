import UIKit
import Capacitor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    private var mirrorProbeTimer: Timer?
    private var mirrorProbeTick = 0

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) { [weak self] in
            self?.installNativeMirrorProbe()
        }
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        installNativeMirrorProbe()
    }

    func applicationWillTerminate(_ application: UIApplication) {
        mirrorProbeTimer?.invalidate()
        mirrorProbeTimer = nil
    }

    func application(_ application: UIApplication,
                     configurationForConnecting connectingSceneSession: UISceneSession,
                     options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        let config = UISceneConfiguration(name: "Default Configuration",
                                          sessionRole: connectingSceneSession.role)
        config.delegateClass = SceneDelegate.self
        return config
    }

    /// Temporary native diagnostic. It is deliberately installed from the
    /// application delegate so it does not depend on SceneDelegate or WebKit.
    /// It never receives touches and does not read or modify game data.
    private func installNativeMirrorProbe() {
        guard let hostWindow = activeWindow(),
              let hostView = hostWindow.rootViewController?.view else { return }

        let probeTag = 27_091_826
        let label: UILabel
        if let existing = hostView.viewWithTag(probeTag) as? UILabel {
            label = existing
        } else {
            label = UILabel()
            label.tag = probeTag
            label.translatesAutoresizingMaskIntoConstraints = false
            label.isUserInteractionEnabled = false
            label.backgroundColor = UIColor(red: 0.72, green: 0.04, blue: 0.04, alpha: 0.94)
            label.textColor = .white
            label.font = .monospacedDigitSystemFont(ofSize: 13, weight: .bold)
            label.textAlignment = .center
            label.layer.cornerRadius = 9
            label.layer.masksToBounds = true
            hostView.addSubview(label)
            NSLayoutConstraint.activate([
                label.topAnchor.constraint(equalTo: hostView.safeAreaLayoutGuide.topAnchor, constant: 6),
                label.centerXAnchor.constraint(equalTo: hostView.centerXAnchor),
                label.widthAnchor.constraint(equalToConstant: 196),
                label.heightAnchor.constraint(equalToConstant: 30)
            ])
        }

        hostView.bringSubviewToFront(label)
        updateNativeMirrorProbe(label)
        startNativeMirrorProbeTimer()
    }

    private func activeWindow() -> UIWindow? {
        let sceneWindow = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .filter { $0.activationState == .foregroundActive || $0.activationState == .foregroundInactive }
            .flatMap { $0.windows }
            .first { $0.isKeyWindow }
        return sceneWindow ?? window
    }

    private func startNativeMirrorProbeTimer() {
        guard mirrorProbeTimer == nil else { return }
        mirrorProbeTimer = Timer.scheduledTimer(withTimeInterval: 0.25, repeats: true) { [weak self] _ in
            guard let self,
                  let hostView = self.activeWindow()?.rootViewController?.view,
                  let label = hostView.viewWithTag(27_091_826) as? UILabel else { return }
            self.mirrorProbeTick += 1
            hostView.bringSubviewToFront(label)
            self.updateNativeMirrorProbe(label)
        }
    }

    private func updateNativeMirrorProbe(_ label: UILabel) {
        label.text = String(format: "NATIVE APP TEST  %05d", mirrorProbeTick)
    }
}
