import Foundation
import UIKit
import Firebase

@UIApplicationMain
@objc(firebaseNotificationPlugin) class firebaseNotificationPlugin : UIResponder, UIApplicationDelegate {
    
    func firebaseNotification(_ command: CDVInvokedUrlCommand) {
        var window: UIWindow?
        
        func application(application: UIApplication,
                         didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?)
            -> Bool {
                FIRApp.configure()
                return true
        }
    }
    
}
