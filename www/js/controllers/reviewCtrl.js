candyCtrl.controller('reviewCtrl', function($scope, $location, mapService) {
    $scope.star = star;
    $scope.review = review;
    $scope.finish = finish;
    
    function star($event){
        console.log($event);
        console.log($event.offsetX);
        if($event.offsetX < 50){
            $scope.review_star = "rate1_0";
        }else if($event.offsetX >= 50 && $event.offsetX < 100){
            $scope.review_star = "rate2_0";
        }else if($event.offsetX >= 100 && $event.offsetX < 150){
            $scope.review_star = "rate3_0";
        }else if($event.offsetX >= 150 && $event.offsetX < 200){
            $scope.review_star = "rate4_0";
        }else if($event.offsetX >= 200){
            $scope.review_star = "rate5_0";
        }
    }
    
    function review($event){
        window.plugins.touchid.isAvailable(
            function() {
                window.plugins.touchid.verifyFingerprint(
                    'Scan your fingerprint please', // this will be shown in the native scanner popup
                    function(msg) {
                        $scope.myValue = true;
                    }, // success handler: fingerprint accepted
                    function(msg) {
                        $scope.myValue = true;
                        alert('not ok: ' + JSON.stringify(msg));
                    } // error handler with errorcode and localised reason
                );
            }, // success handler: TouchID available
            function(msg) {
                $scope.myValue = true;
                alert('not available, message: ' + msg)
            } // error handler: no TouchID available
        );
        
    }
    function finish($event){
        mapService.map.setClickable( true );
        $location.path('#/tab/mainMap');
        $scope.myValue = false;
    }
});
