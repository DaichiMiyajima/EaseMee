candyCtrl.controller('landingCtrl', function($scope, authService) {
    $scope.login = login;
    
    function login(){
        return authService.login();
    }
});
