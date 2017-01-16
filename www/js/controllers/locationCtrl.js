candyCtrl.controller('locationCtrl', function($scope, gpsService) {
    $scope.locationSetting = locationSetting;

    function locationSetting(){
        gpsService.locationSetting();
    }
});
