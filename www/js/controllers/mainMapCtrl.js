candyCtrl.controller('mainMapCtrl', function($rootScope, $scope, $ionicPlatform, $ionicModal, rootService, gpsService, userService, canvasService, mapService, orientationService, elementService,$state) {

    //Map and Marker
    $ionicPlatform.ready(function() {
        var div = document.getElementById('mapMain_map_canvas');
        gpsService.getCurrentPosition().then(function(position){
            mapService.loadMap(div).then(function(map){
                //Create Marker
                //using geo query to track a set of keys matching a criteria.
                rootService.geoQuery.on("ready", function() {
                    console.log("GeoQuery has loaded and fired all other events for initial data");
                });
                rootService.geoQuery.on("key_entered", function(key, location, distance) {
                    console.log(key + " entered query at " + location + " (" + distance + " km from center)");
                    userService.userObject(key).$loaded().then(function(userObject){
                        canvasService.icon(userObject.profileimage).then(function(canvasimage){
                            //canvasService.infowindow(userObject).then(function(canvasinfowindow){
                                //elementService.addmarker(userObject, canvasimage, canvasinfowindow, key, location, distance);
                                elementService.addmarker(userObject, canvasimage, "", key, location, distance);
                                //watch changing Orientation
                                userService.usermagneticHeading[key] = userService.userHeading(key);
                                userService.usermagneticHeading[key].$watch(function(event) {
                                    userService.userHeading(key).$loaded().then(function(magneticHeading){
                                        elementService.rotatemarker(key, magneticHeading.heading);
                                    });
                                });
                            //});
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
    
    //Option modal window
    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope,
        animation: 'slide-in-down'
    }).then(function(modal) {
        $scope.modal = modal;
        elementService.modal = modal;
    });
    $scope.closeModal = function() {
        $scope.modal.hide();
        mapService.map.setClickable( true );
    };
    //for test
    $scope.openModal = function() {
        $scope.modal.show();
        mapService.map.setClickable( true );
    };
    
    $scope.review = function() {
        $state.go('review');
    }
    $scope.openSearch = function(){
        $scope.menu = true;
        mapService.map.setClickable( false );
        $rootScope.hideTabs = true;
    }
    $scope.closeSearch = function(){
        $scope.menu = false;
        mapService.map.setClickable( true );
        $rootScope.hideTabs = false;
        
    }
});
