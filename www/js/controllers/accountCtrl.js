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
        console.log('onClickBtnEcho: msg.send=' + $scope.msg.send);
        console.log(window.EchoPlugin);
        if (window.EchoPlugin) {
            console.log('PASS1:'+$scope.msg.send);
            window.EchoPlugin.echo($scope.msg.send, function(returnMsg) {
                console.log('PASS2');
                $scope.msg.return = returnMsg;
                console.log('onClickBtnEcho: msg.return=' + $scope.msg.return);
                $scope.$applyAsync();
            }
            ,function() {
                console.log("PASS3 error!!!!!!!!!!!!!!!!!");
            });
        } else {
            console.log('NO EchoPlugin');  
        }  
    };

});
