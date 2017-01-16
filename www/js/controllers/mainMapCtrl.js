candyCtrl.controller('mainMapCtrl', function($scope, $ionicPlatform, rootService, gpsService, userService, canvasService, mapService, orientationService, elementService,$state,authService) {

    //Map and Marker
    $ionicPlatform.ready(function() {
        //Only when opening the screen. This function doesn't work when background
        $scope.init = function(){
            var div = document.getElementById('mapMain_map_canvas');
            mapService.loadMap(div).then(function(map){
                gpsService.getCurrentPosition().then(function(position){
                    //Map Set center to user's location
                    mapService.map.setCenter(new plugin.google.maps.LatLng(rootService.geoQuery.center()[0], rootService.geoQuery.center()[1]));
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
                    //orientationService.arrow();
                    //update online or not and time
                    userService.updateUser_online(authService.authData.uid, "online controller1");
                });
            });
        }
    });

    $ionicPlatform.on("resume", function() {
        gpsService.getCurrentPosition().then(function(position){
            //Map Set center to user's location
            mapService.map.setCenter(new plugin.google.maps.LatLng(rootService.geoQuery.center()[0], rootService.geoQuery.center()[1]));
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
        });
    });
});
