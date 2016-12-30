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
            // Set up the URL request
            let todoEndpoint: String = "http://160.16.197.85:3033/api/location"
            guard let url = URL(string: todoEndpoint) else {
                print("Error: cannot create URL")
                return
            }
            var urlRequest = URLRequest(url: url)
            urlRequest.httpMethod = "POST"
            
            // set up the session
            let config = URLSessionConfiguration.default
            let session = URLSession(configuration: config)
            
            // make the request
            let task = session.dataTask(with: urlRequest) {
                (data, response, error) in
                // check for any errors
                guard error == nil else {
                    print("error calling GET on /todos/1")
                    print(error)
                    return
                }
                // make sure we got data
                guard let responseData = data else {
                    print("Error: did not receive data")
                    return
                }
                // parse the result as JSON, since that's what the API provides
                do {
                    guard let todo = try JSONSerialization.jsonObject(with: responseData, options: []) as? [String: AnyObject] else {
                        print("error trying to convert data to JSON")
                        return
                    }
                    // now we have the todo, let's just print it to prove we can access it
                    print("The todo is: " + todo.description)
                    
                    // the todo object is a dictionary
                    // so we just access the title using the "title" key
                    // so check for a title and print it if we have one
                    guard let todoTitle = todo["title"] as? String else {
                        print("Could not get todo title from JSON")
                        return
                    }
                    print("The title is: " + todoTitle)
                } catch  {
                    print("error trying to convert data to JSON")
                    return
                }
            }
            
            task.resume()
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
