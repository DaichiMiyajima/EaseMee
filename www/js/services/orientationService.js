candyService.factory('orientationService', function(rootService, authService, configService, userService){

    function arrow(){
        configService(function(config){
            orientation.watchid = navigator.compass.watchHeading(
                function onSuccess(heading) {
                    orientation.heading = heading.magneticHeading;
                    //set heading and bearing
                    rootService.magneticHeading(authService.authData.uid).update({
                        heading: orientation.heading
                    });
                    
                    //For test
                    //update online or not and time
                    userService.updateUser_online_test(authService.authData.uid, "orientation");
                    
                    
                    
                }, function onError(error) {
                }, config.globalConfig.headingOptions
            );
        });
    }

    var orientation = {
        heading: 0,
        watchid:"",
        arrow: arrow
    };

    return orientation;

});
