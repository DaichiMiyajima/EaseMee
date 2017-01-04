import UIKit
import CoreLocation
import Foundation

@objc(gpsFetchPlugin) class gpsFetchPlugin :  CDVPlugin, CLLocationManagerDelegate, UIApplicationDelegate {
    
    var myLocationManager: CLLocationManager!
    var userid: String!
    var gpsURL: String!
    
    //
    func gpsFetch(_ command: CDVInvokedUrlCommand) {
        let status = CLLocationManager.authorizationStatus()
        userid = command.arguments[0] as! String
        gpsURL = command.arguments[1] as! String
        if status == CLAuthorizationStatus.restricted || status == CLAuthorizationStatus.denied {
            return
        }
        
        myLocationManager = CLLocationManager()
        // 常に位置情報を取得する権限
        myLocationManager.requestAlwaysAuthorization()
        myLocationManager.delegate = self
        
        myLocationManager.requestAlwaysAuthorization()
        
        if status == CLAuthorizationStatus.notDetermined {
            myLocationManager.requestAlwaysAuthorization()
        }
        
        if !CLLocationManager.locationServicesEnabled() {
            return
        }
        
        myLocationManager.desiredAccuracy = kCLLocationAccuracyBestForNavigation
        myLocationManager.distanceFilter = 1
        myLocationManager.pausesLocationUpdatesAutomatically = false
        myLocationManager.allowsBackgroundLocationUpdates = true
        
        //star location
        //myLocationManager.startUpdatingLocation()
        myLocationManager.startMonitoringSignificantLocationChanges()
        
        //stop location update
        //myLocationManager.stopUpdatingLocation()
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
            
            
            var urlRequest = URLRequest(url: url)
            urlRequest.httpMethod = "POST"
            urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
            urlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
            do {
                urlRequest.httpBody = try JSONSerialization.data(withJSONObject: json , options:[])
                // pass dictionary to nsdata object and set it as request body
                
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
