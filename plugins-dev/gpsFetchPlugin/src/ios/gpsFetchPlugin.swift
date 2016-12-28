import UIKit
import CoreLocation
import Foundation

@objc(gpsFetchPlugin) class gpsFetchPlugin :  CDVPlugin, CLLocationManagerDelegate {
    
    var myLocationManager: CLLocationManager!
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let lastLocation = locations.last
        if let last = lastLocation {
            let eventDate = last.timestamp
            if let location = manager.location {
                print("緯度：\(location.coordinate.latitude)")
                print("経度：\(location.coordinate.longitude)")
                print(eventDate)
            }
            //url:http://160.16.197.85:3033/api/location
        }
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
    
    func gpsFetch(_ command: CDVInvokedUrlCommand) {
        print("ボタンスタート")
        let status = CLLocationManager.authorizationStatus()
        print(status)
        
        
        if status == CLAuthorizationStatus.restricted || status == CLAuthorizationStatus.denied {
            return
        }
        
        myLocationManager = CLLocationManager()
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
        myLocationManager.pausesLocationUpdatesAutomatically = true
        myLocationManager.allowsBackgroundLocationUpdates = true
        
        //star location
        myLocationManager.startUpdatingLocation()
        
        //stop location update
        //myLocationManager.stopUpdatingLocation()
    }
    
}
