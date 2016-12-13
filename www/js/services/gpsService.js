candyService.factory('gpsService', function($q, $ionicPlatform, $cordovaGeolocation, configService, rootService, authService){

    var getWatchPosition = function(){
        $ionicPlatform.ready().then(function() {
            if(gpsService.watchID != "init"){
                console.log("init pass!!");
                gpsService.watchID.clearWatch();
            }
            configService(function(config){
                console.log("watch pass!!");
                gpsService.watchID =  $cordovaGeolocation.watchPosition(config.globalConfig.positionOptions.options);
                gpsService.watchID.then(null, errorwatch, successwatch);
            });
        });
    };

    function errorwatch(err){
        //alert("Failed to get position.");
        console.log(err);
    } 
    
    function successwatch(position){
        configService(function(config){
            if(position.coords.accuracy <= config.globalConfig.positionOptions.accuracy){
                //update center positon when changing location
                rootService.geoQuery.updateCriteria({
                    center: [position.coords.latitude, position.coords.longitude],
                    radius: config.globalConfig.geoQuery.radius
                });
                //update own location
                rootService.geoFire.set(
                    authService.isLoggedIn().uid,
                    [position.coords.latitude, position.coords.longitude]
                ).then(function() {
                    console.log("Updated own location.");
                }, function(error) {
                    console.log("Error: " + error);
                });
            }
        });
    }

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
                    //update own location
                    rootService.geoFire.set(
                        authService.isLoggedIn().uid,
                        [position.coords.latitude, position.coords.longitude]
                    ).then(function() {
                        console.log("Updated own location.");
                    }, function(error) {
                        console.log("Error: " + error);
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
        getWatchPosition: getWatchPosition,
        getCurrentPosition: getCurrentPosition
    };

    return gpsService;

});
