var candy = angular.module('candy', ['ionic', 'firebase', 'candy.controllers', 'candy.services', 'candy.directives', 'ngCordova'])

.run(function($ionicPlatform, authService,$rootScope, $location, gpsService) {
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

    // When ng-route changing. Redirect if the user is loggedin or not
    $rootScope.$on('$stateChangeStart', function(ev, next, current){
        if(!authService.isLoggedIn()){
            $location.path('/landing');
        }else{
            //Background gps Service
            gpsService.gpsFetch(authData);
        }
    });

    // any time auth status updates
    authService.onAuth(function(authData){
        if(authData){
            $location.path('/');
            authService.register(authData);
            //Background gps Service
            gpsService.gpsFetch(authData);
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
        controller: 'userinfoCtrl'
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/mainMap');
});
