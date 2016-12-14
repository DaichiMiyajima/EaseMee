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
                    console.log(key + " moved within query to " + location + " (" + distance + " km from center)");
                    elementService.changemarker(key, location, distance);
                });
                rootService.geoQuery.on("key_exited", function(key, location, distance) {
                    console.log(key + " exited query to " + location + " (" + distance + " km from center)");
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
});
