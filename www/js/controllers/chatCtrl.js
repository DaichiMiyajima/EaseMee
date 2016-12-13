candyCtrl.controller('chatCtrl', function($scope, $state) {
    $scope.gochatdetail = gochatdetail;
    
    function gochatdetail($event){
        $state.go('chatdetail');
    }
});
