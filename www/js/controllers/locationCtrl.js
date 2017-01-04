candyCtrl.controller('locationCtrl', function($scope, gpsService) {
    $scope.locationSetting = locationSetting;

    function locationSetting(){
        console.log("locationSetting");
        gpsService.locationSetting();
    }
});
