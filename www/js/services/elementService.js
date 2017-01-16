candyService.factory('elementService', function(mapService, configService, authService, $rootScope, $ionicModal, $location, $state){

    function addmarker(userObject, canvasimage, canvasinfowindow, key, location, distance){
        if(!element.markers[key]){
            configService(function(config){
                //For creating user marker
                mapService.map.addMarker({
                    'position': new plugin.google.maps.LatLng(location[0], location[1]),
                    'zIndex': 100,
                    // must use optimized false for CSS  to the marker specification. This allows you to render each marker as a separate DOM element
                    'optimized': false,
                    'icon': {
                         'url': canvasimage,
                         'size': {
                                width: 2.5 * config.globalConfig.mapOptions.camera.zoom,
                                height: 2.75 * config.globalConfig.mapOptions.camera.zoom
                         }
                    }
                }, function(marker) {
                    element.markers[key] = marker;
                    mapService.map.on(plugin.google.maps.event.CAMERA_CHANGE, function(camera){
                        size_width = 2.5 * camera.zoom;
                        size_height = 2.75 * camera.zoom;
                        element.markers[key].setIcon({
                            'url': canvasimage,
                            'size': {
                                width: size_width,
                                height: size_height
                            }
                        });
                    });
                    element.markers[key].addEventListener(plugin.google.maps.event.MARKER_CLICK, function() {
                        mapService.map.setClickable( false );
                        $state.go('userinfo', { userid: key});
                    });
                });
                //For creating arrow marker
                mapService.map.addMarker({
                    'position': new plugin.google.maps.LatLng(location[0], location[1]),
                    'zIndex' : 120,
                    'icon': {
                         'url': 'img/arrow.png',
                         'size': {
                                width: config.globalConfig.mapOptions.camera.zoom,
                                height: config.globalConfig.mapOptions.camera.zoom
                         }
                    }
                }, function(marker) {
                    element.markersArrow[key] = marker;
                    mapService.map.on(plugin.google.maps.event.CAMERA_CHANGE, function(camera){
                        if(camera.zoom < 11){
                            size_width = 0.1;
                            size_height = 0.1;
                        }else{
                            size_width = camera.zoom;
                            size_height = camera.zoom;
                        }
                        element.markersArrow[key].setIcon({
                            'url': 'img/arrow.png',
                            'size': {
                                width: size_width,
                                height: size_height
                            }
                        });
                        //set common bearing
                        element.bearing = Number(camera.bearing);
                        //rotate arrow of everyone
                        Object.keys(element.markersArrow).forEach(function(key) {
                            element.rotatemarker(key, element.userheading[key]);
                        }, element.markersArrow);
                    });
                });
            });
        }
    }

    function changemarker(key, location, distance){
        if(element.markers[key]){
            //image
            element.markers[key].setPosition(new plugin.google.maps.LatLng(location[0], location[1]));
            //arrow
            element.markersArrow[key].setPosition(new plugin.google.maps.LatLng(location[0], location[1]));
        }
    }

    function deletemarker(key, location, distance){
        if(element.markers[key]){
            //image
            element.markers[key].remove();
            delete element.markers[key];
            //arrow
            element.markersArrow[key].remove();
            delete element.markersArrow[key];
            delete element.userheading[key];
        }
    }

    function rotatemarker(key, heading){
        element.userheading[key] = heading;
        var heading_degree = (Number(heading) + (360 - Number(element.bearing))) % 360;
        element.markersArrow[key].setRotation(heading_degree);
    }

    var element = {
        markers: new Array(),
        markersArrow: new Array(),
        userheading: new Array(),
        bearing: 0,
        modal:"",
        addmarker: addmarker,
        changemarker: changemarker,
        deletemarker: deletemarker,
        rotatemarker: rotatemarker
    };

    return element

});
