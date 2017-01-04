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
            });
        });
    });
});
