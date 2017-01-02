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

    $scope.msg = {  
        'send': 'message to send',  
        'return': ''
    };

    $scope.onClickBtnEcho = function() {
        if (window.EchoPlugin) {
            window.EchoPlugin.echo($scope.msg.send, function(returnMsg) {
                $scope.msg.return = returnMsg;
                $scope.$applyAsync();
            }
            ,function() {
            });
        } else {
        }  
    };

});
