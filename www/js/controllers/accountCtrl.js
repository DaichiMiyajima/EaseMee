candyCtrl.controller('accountCtrl', function($scope, authService, $location,$state) {
    $scope.logout = logout;
    $scope.review = review;
    $scope.chatDetail = chatDetail;

    $scope.photoURL = authService.authData.photoURL;
    $scope.displayName = authService.authData.displayName;
    
    function logout(){
        authService.logout();
    }

    function review(){
        $location.path('#/review');
    }

    function chatDetail(){
        $state.go('chatdetail');
    }
});
