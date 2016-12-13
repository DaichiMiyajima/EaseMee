candyCtrl.controller('chatdetailCtrl', function($scope, $state,rootService,$firebaseArray,authService, userService,mapService) {
    $scope.messages = $firebaseArray(rootService.message);
    
    $scope.sendMessage = sendMessage;
    
    $scope.gochat = gochat;
    
    function gochat(){
        mapService.map.setClickable( true );
        $state.go('chat');
    }
    function sendMessage(messageInput){
        console.log(messageInput);
        if(messageInput && messageInput.length > 0){
        userService.userObject(authService.isLoggedIn().uid).$loaded().then(function(userObject){
            console.log(userObject);
            $scope.messageInput = "";
            var newPostRef = rootService.message.push();
            newPostRef.set({
                photoURL : userObject.profileimage,
                displayname: userObject.name,
                time : new Date().getTime(),
                message : messageInput
            });//set
        });
        }
    }
    window.addEventListener('native.keyboardshow', function (e){
        //画面全体の高さ - e.keyboardHeight
        console.log("--------------------------------------------------------------");
        console.log(document.getElementById('chatdetail_message').style.bottom);
        console.log(e.keyboardHeight);
        document.getElementById('chatdetail_message').style.bottom = e.keyboardHeight + "px";
        console.log(document.getElementById('chatdetail_message').style.bottom);
        console.log("--------------------------------------------------------------");
    })

     //keyboard event
    window.addEventListener('native.keyboardhide', function (e){
        //画面全体の高さ - e.keyboardHeight
        document.getElementById('chatdetail_message').style.bottom = "0px";
    });
    
});
