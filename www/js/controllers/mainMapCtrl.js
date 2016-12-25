candyCtrl.controller('mainMapCtrl', function($rootScope, $scope, $ionicPlatform, $ionicModal, rootService, gpsService, userService, canvasService, mapService, orientationService, elementService,$state) {

    //Map and Marker
    $ionicPlatform.ready(function() {
        var div = document.getElementById('mapMain_map_canvas');
        gpsService.getCurrentPosition().then(function(position){
            mapService.loadMap(div).then(function(map){
                //Create Marker
                rootService.geoQuery.on("key_entered", function(key, location, distance) {
                    console.log(key + " entered query at " + location + " (" + distance + " km from center)");
                    userService.userObject(key).$loaded().then(function(userObject){
                        canvasService.icon(userObject.profileimage).then(function(canvasimage){
                                elementService.addmarker(userObject, canvasimage, "", key, location, distance);
                                //watch changing Orientation
                                userService.usermagneticHeading[key] = userService.userHeading(key);
                                userService.usermagneticHeading[key].$watch(function(event) {
                                    userService.userHeading(key).$loaded().then(function(magneticHeading){
                                        elementService.rotatemarker(key, magneticHeading.heading);
                                    });
                                });
                        });
                    });
                });
                rootService.geoQuery.on("key_moved", function(key, location, distance) {
                    elementService.changemarker(key, location, distance);
                });
                rootService.geoQuery.on("key_exited", function(key, location, distance) {
                    elementService.deletemarker(key, location, distance);
                });
                //change the orientation
                orientationService.arrow();
                $scope.candy.map = map;
            });
            //When finished the loading getCurrent position, you call watchposition. 
            //Error will happen If you call this watchposition in parallel with getCurrentPosition
            gpsService.getWatchPosition();
        });
    });
    
    /*
    $ionicPlatform.ready(function() {
        var callbackFn = function(location) {
            console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);
            backgroundGeolocation.finish();
        };
    
        var failureFn = function(error) {
            console.log('BackgroundGeolocation error');
        };
    
        // BackgroundGeolocation is highly configurable. See platform specific configuration options
        backgroundGeolocation.configure(callbackFn, failureFn, {
            desiredAccuracy : 50,
            stationaryRadius : 50,  
            distanceFilter : 50,
            debug: true,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            notificationIconColor: '#FEDD1E',
            notificationIconLarge: 'mappointer_large',
            notificationIconSmall: 'mappointer_small',
            url: 'http://160.16.197.85:3033/api/location',
            syncUrl: 'http://160.16.197.85:3033/api/location',
            httpHeaders: { 'X-FOO': 'bar' },
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 100000,
            stopOnTerminate: false,
            startOnBoot: true,
            startForeground: true,
            stopOnStillActivity: false,
            activityType: 'Other',
            pauseLocationUpdates: false,
            saveBatteryOnBackground: false,
            maxLocations: 100
        });
    
        // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
        backgroundGeolocation.start();
        
        backgroundGeolocation.getLocations(
            function (locations) {
                console.log(locations);
                jQuery.post(url, JSON.stringify(location));
            }
        );
    
        // If you wish to turn OFF background-tracking, call the #stop method.
        // backgroundGeolocation.stop();
    });
    */
});
