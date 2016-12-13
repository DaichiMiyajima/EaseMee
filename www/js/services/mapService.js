candyService.factory('mapService', function($q, rootService, configService){

    // load map
    var loadMap = function(div){
        var deferred = $q.defer();
        configService(function(config){
            var map = plugin.google.maps.Map.getMap(div, config.globalConfig.mapOptions);
            map.setCenter(new plugin.google.maps.LatLng(rootService.geoQuery.center()[0], rootService.geoQuery.center()[1]));
            mapService.map = map;
            deferred.resolve(map);
        });
        return deferred.promise;
    }

    var mapService = {
        map : "",
        loadMap: loadMap
    }

    return mapService;

});
