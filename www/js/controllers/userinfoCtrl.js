candyCtrl.controller('userinfoCtrl', function($scope, $location, $state, mapService, $stateParams, userService) {
    $scope.goback = goback;
    $scope.goreview = goreview;
    $scope.gochatdetail = gochatdetail;
    $scope.userinfo_tab_photo = "userinfo_tab_click";
    $scope.userinfo_tab_list = "";
    $scope.userinfo_tab_account = "";
    $scope.userinfo_tab_photos_show = true;
    $scope.userinfo_tab_lists_show = false;
    $scope.userinfo_tab_accounts_show = false;
    $scope.photo_click = photo_click;
    $scope.list_click = list_click;
    $scope.account_click = account_click;
    console.log("$stateParams.userid");
    console.log($stateParams.userid);
    //get user info
    userService.userObject($stateParams.userid).$loaded().then(function(userObject){
        $scope.username = userObject.name;
        $scope.profileimage = userObject.profileimage;
        $scope.positiontime = userObject.positiontime;
    });

    function goback($event){
        mapService.map.setClickable( true );
        $state.go('tab.main-map');
    }
    function goreview($event){
        $state.go('review');
    }
    function gochatdetail($event){
        $state.go('chatdetail');
    }

    function photo_click($event){
        $scope.userinfo_tab_photo = "userinfo_tab_click";
        $scope.userinfo_tab_list = "";
        $scope.userinfo_tab_account = "";
        $scope.userinfo_tab_photos_show = true;
        $scope.userinfo_tab_lists_show = false;
        $scope.userinfo_tab_accounts_show = false;
    }
    function list_click($event){
        $scope.userinfo_tab_photo = "";
        $scope.userinfo_tab_list = "userinfo_tab_click";
        $scope.userinfo_tab_account = "";
        $scope.userinfo_tab_photos_show = false;
        $scope.userinfo_tab_lists_show = true;
        $scope.userinfo_tab_accounts_show = false;
    }
    function account_click($event){
        $scope.userinfo_tab_photo = "";
        $scope.userinfo_tab_list = "";
        $scope.userinfo_tab_account = "userinfo_tab_click";
        $scope.userinfo_tab_photos_show = false;
        $scope.userinfo_tab_lists_show = false;
        $scope.userinfo_tab_accounts_show = true;
    }
});
