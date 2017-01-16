var candy = angular.module('candy', ['ionic', 'firebase', 'candy.controllers', 'candy.services', 'candy.directives', 'ngCordova'])

.run(function($ionicPlatform, authService,$rootScope, $location, gpsService, userService, orientationService) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        openFB.init({appId: '880988045380765', tokenStore: window.localStorage, accessToken: window.localStorage.accessToken});
    });

    //Background to foreground event
    $ionicPlatform.on("resume", function() {
        //update online or not and time
        userService.updateUser_online(authService.authData.uid, "online");
        gpsService.gpsFetch(authService.authData,
            function(msg) {
                $location.path('/');
            },
            function(msg) {
                $location.path('/location');
            }
        );
    });

    //foreground to background event
    $ionicPlatform.on("pause", function() {
        //Clear watch orientation
        if(orientationService.watchid){
            navigator.compass.clearWatch(orientationService.watchid);
        }
        //update online or not and time
        userService.updateUser_online(authService.authData.uid, "offline");
    });

    // When ng-route changing. Redirect if the user is loggedin or not
    $rootScope.$on('$stateChangeStart', function(ev, next, current){
        if(!authService.isLoggedIn()){
            $location.path('/landing');
        }else{
            authService.authData = authData;
        }
    });

    // any time auth status updates
    authService.onAuth(function(authData){
        if(authData){
            $location.path('/');
            authService.register(authData);
            authService.authData = authData;
            //Background gps Service
            gpsService.gpsFetch(authService.authData,
                function(msg) {
                    $location.path('/');
                },
                function(msg) {
                    $location.path('/location');
                }
            );
        }else{
            $location.path('/landing');
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $cordovaFacebookProvider) {
    $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:
    .state('tab.main-map', {
        url: '/mainMap',
        views: {
            'tab-mainMap': {
                templateUrl: 'templates/mainMap.html',
                controller: 'mainMapCtrl'
            }
        }
    })
    .state('landing', {
        url: '/landing',
        templateUrl: 'templates/landing.html',
        controller: 'landingCtrl'
    })
    .state('location', {
        url: '/location',
        templateUrl: 'templates/location.html',
        controller: 'locationCtrl'
    })
    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'accountCtrl'
            }
        }
    })
    .state('userinfo', {
        url: '/userinfo',
        templateUrl: 'templates/userinfo.html',
        controller: 'userinfoCtrl',
        params: {'userid' : null}
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/mainMap');
});
