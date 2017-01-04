candyService.factory('gpsService', function($q, $ionicPlatform, $cordovaGeolocation, configService, rootService, authService){

    var getCurrentPosition = function(){
        var deferred = $q.defer();
        $ionicPlatform.ready().then(function() {
            configService(function(config){
                $cordovaGeolocation.getCurrentPosition(config.globalConfig.positionOptions.options).then(function(position){
                    deferred.resolve(position);
                    //update center positon when changing location
                    rootService.geoQuery.updateCriteria({
                        center: [position.coords.latitude, position.coords.longitude],
                        radius: config.globalConfig.geoQuery.radius
                    });
                }, function(err){
                    deferred.reject();
                });
            });
        });
        return deferred.promise;
    };

    var gpsService= {
        watchID: "init",
        getCurrentPosition: getCurrentPosition
    };

    return gpsService;

});
