candyService.factory('configService', function(rootService, $firebaseObject){

    // Creates a three-way binding config
    var config = $firebaseObject(rootService.config);
    // to take an action after the data loads, use the $loaded() promise
    var configValue = function(cb){
        config.$loaded().then(function() {
            // To iterate the key/value pairs of the object, use angular.forEach()
            angular.forEach(config, function(value, key) {
                //console.log(key, value);
            });
            cb(config);
        });
    }
    return configValue;
});
