import UIKit
import CoreLocation

@objc(gpsFetchPlugin) class gpsFetchPlugin : UIViewController, CLLocationManagerDelegate {
    
    var myLocationManager: CLLocationManager!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let status = CLLocationManager.authorizationStatus()
        if status == CLAuthorizationStatus.restricted || status == CLAuthorizationStatus.denied {
            return
        }
        
        myLocationManager = CLLocationManager()
        myLocationManager.delegate = self
        
        
        if status == CLAuthorizationStatus.notDetermined {
            myLocationManager.requestAlwaysAuthorization()
        }
        
        if !CLLocationManager.locationServicesEnabled() {
            return
        }
        
        myLocationManager.desiredAccuracy = kCLLocationAccuracyBestForNavigation
        myLocationManager.distanceFilter = 100
        myLocationManager.pausesLocationUpdatesAutomatically = true
        myLocationManager.activityType = CLActivityType.fitness
    }
    
    
    func locationManager(manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let lastLocation = locations.last
        if let last = lastLocation {
            let eventDate = last.timestamp
            if abs(eventDate.timeIntervalSinceNow) < 15.0 {
                if let location = manager.location {
                    print("緯度：\(location.coordinate.latitude)")
                    print("経度：\(location.coordinate.longitude)")
                }
            }
        }
    }
    
    func locationManager(manager: CLLocationManager, didFailWithError error: NSError) {
        print("error")
    }
    
    func locationManagerDidPauseLocationUpdates(manager: CLLocationManager) {
        print("位置情報更新停止")
    }
    
    func locationManagerDidResumeLocationUpdates(manager: CLLocationManager) {
        print("位置情報更新再開")
    }
    
    func gpsfetch(_ command: CDVInvokedUrlCommand) {
        print("ボタンスタート")
        //star location
        myLocationManager.startUpdatingLocation()
        
        //stop location update
        //myLocationManager.stopUpdatingLocation()
    }
    
}
