import UIKit
import CoreLocation
import Foundation

@objc(gpsFetchPlugin) class gpsFetchPlugin :  CDVPlugin, CLLocationManagerDelegate, UIApplicationDelegate {
    
    var myLocationManager: CLLocationManager!
    var userid: String!
    var gpsURL: String!
    
    //start location service
    func gpsFetch(_ command: CDVInvokedUrlCommand) {
        // returning back Result
        var pluginResult = CDVPluginResult(
            status: CDVCommandStatus_ERROR
        )
        
        let status = CLLocationManager.authorizationStatus()
        userid = command.arguments[0] as! String
        gpsURL = command.arguments[1] as! String
        
        myLocationManager = CLLocationManager()
        if status == CLAuthorizationStatus.notDetermined {
            print("STATUS notDetermined")
            pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: "notDetermined")
            self.commandDelegate!.send(
                pluginResult,
                callbackId: command.callbackId
            )
            //myLocationManager.requestAlwaysAuthorization()
        }
        if status == CLAuthorizationStatus.restricted {
            print("STATUS restricted")
            pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: "restricted")
            self.commandDelegate!.send(
                pluginResult,
                callbackId: command.callbackId
            )
        }
        if status == CLAuthorizationStatus.denied {
            print("STATUS denied")
            pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: "denied")
            self.commandDelegate!.send(
                pluginResult,
                callbackId: command.callbackId
            )
            //UIApplication.shared.openURL(URL(string: "app-settings:")!)
        }
        if status == CLAuthorizationStatus.authorizedWhenInUse {
            print("STATUS authorizedWhenInUse")
            pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: "authorizedWhenInUse")
            self.commandDelegate!.send(
                pluginResult,
                callbackId: command.callbackId
            )
            //UIApplication.shared.openURL(URL(string: "app-settings:")!)
        }
        if status == CLAuthorizationStatus.authorizedAlways {
            print("STATUS authorizedAlways")
            pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: "authorizedAlways")
        }
        
        // 常に位置情報を取得する権限
        myLocationManager.requestAlwaysAuthorization()
        myLocationManager.delegate = self
        
        
        myLocationManager.desiredAccuracy = kCLLocationAccuracyBestForNavigation
        myLocationManager.distanceFilter = 100
        myLocationManager.pausesLocationUpdatesAutomatically = false
        myLocationManager.allowsBackgroundLocationUpdates = true
        
        //star location
        //myLocationManager.startUpdatingLocation()
        myLocationManager.startMonitoringSignificantLocationChanges()
        
        //stop location update
        //myLocationManager.stopUpdatingLocation()
        
        self.commandDelegate!.send(
            pluginResult,
            callbackId: command.callbackId
        )
        
    }
    //open setting application
    func openSetting(_ command: CDVInvokedUrlCommand) {
        UIApplication.shared.openURL(URL(string: "app-settings:")!)
    }
    
    // MARK: CLLocationManagerDelegate
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        print("didUpdateLocations START!")
        let lastLocation = locations.last
        if let last = lastLocation {
            let eventDate = last.timestamp
            if let location = manager.location {
                print("緯度：\(location.coordinate.latitude)")
                print("経度：\(location.coordinate.longitude)")
                print(eventDate)
            }
            
            // Set up the URL request
            let todoEndpoint: String = gpsURL
            guard let url = URL(string: todoEndpoint) else {
                print("Error: cannot create URL")
                return
            }
            let json = [
                "latitude" : lastLocation?.coordinate.latitude ,
                "longitude" : lastLocation?.coordinate.longitude ,
                "userid": userid
                ] as [String : Any]
            
            //post location update to API Server
            var urlRequest = URLRequest(url: url)
            urlRequest.httpMethod = "POST"
            urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
            urlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
            do {
                urlRequest.httpBody = try JSONSerialization.data(withJSONObject: json , options:[])
                
            } catch let error {
                print(error.localizedDescription)
            }
            
            // set up the session
            let config = URLSessionConfiguration.default
            let session = URLSession(configuration: config)
            
            session.dataTask(with: urlRequest).resume()
        }
    }
    
    //バックグラウンドに入る時に呼ばれる
    func applicationDidEnterBackground(_ application: UIApplication) {
        print("ApplicationDidEnterBackground START!")
        if CLLocationManager.significantLocationChangeMonitoringAvailable() {
            myLocationManager.startMonitoringSignificantLocationChanges()
        }
    }
    
    //位置情報更新時にアプリのプロセスが停止している場合もここから起動
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        if launchOptions?[UIApplicationLaunchOptionsKey.location] != nil {
            myLocationManager.startMonitoringSignificantLocationChanges()
        }
        return true
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("error")
    }
    
    func locationManagerDidPauseLocationUpdates(_ manager: CLLocationManager) {
        print("位置情報更新停止")
    }
    
    func locationManagerDidResumeLocationUpdates(_ manager: CLLocationManager) {
        print("位置情報更新再開")
    }
}
