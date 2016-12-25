candyService.factory('backgroundgpsService', ['$q', '$http', function ($q, $http) {
  var callbackFn = function(location) {
      $http({
          //request options to send data to server
      });
    backgroundGeoLocation.finish();
  },
 
  failureFn = function(error) {
    console.log('BackgroundGeoLocation error ' + JSON.stringify(error));
  },
 
  //Enable background geolocation
  start = function () {
      //save settings (background tracking is enabled) in local storage
    window.localStorage.setItem('bgGPS', 1);
 
    backgroundGeoLocation.configure(callbackFn, failureFn, {
      url: "http://160.16.197.85:3033/api/location",
      syncUrl: "http://160.16.197.85:3033/api/location",
      desiredAccuracy: 1000,
      stationaryRadius: 1,
      distanceFilter: 1,
      locationService: 'ANDROID_DISTANCE_FILTER',
      debug: false,
      stopOnTerminate: false,
      maxLocations: 10
    });
    console.log("start Geolocation!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    backgroundGeoLocation.start();
  };
 
  return {
    start: start,
 
      // Initialize service and enable background geolocation by default
    init: function () {
      var bgGPS = window.localStorage.getItem('bgGPS');
      if (bgGPS == 1 || bgGPS == null) {
        start();
      }
    },
 
      // Stop data tracking
    stop: function () {
      window.localStorage.setItem('bgGPS', 0);
      backgroundGeoLocation.stop();
    }
  }
}]);