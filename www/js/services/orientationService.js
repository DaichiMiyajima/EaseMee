candyService.factory('orientationService', function(rootService, authService, configService){

    function arrow(){
        configService(function(config){
            navigator.compass.watchHeading(
                function onSuccess(heading) {
                    orientation.heading = heading.magneticHeading;
                    //set heading and bearing
                    rootService.magneticHeading(authService.isLoggedIn().uid).set({
                        heading: orientation.heading
                    });
                }, function onError(error) {
                }, config.globalConfig.headingOptions
            );
        });
    }

    var orientation = {
        heading: 0,
        arrow: arrow
    };

    return orientation;

});
