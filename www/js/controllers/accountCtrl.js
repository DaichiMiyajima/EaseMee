candyCtrl.controller('accountCtrl', function($scope, authService, $location,$state) {
    $scope.logout = logout;
    $scope.review = review;
    $scope.chatDetail = chatDetail;
    
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
