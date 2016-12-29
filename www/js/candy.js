var candy = angular.module('candy', ['ionic', 'firebase', 'candy.controllers', 'candy.services', 'candy.directives', 'ngCordova'])

.run(function($ionicPlatform, authService,$rootScope, $location) {
    console.log("RUN THROUGH");
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
        }
    });

    // any time auth status updates
    authService.onAuth(function(authData){
        if(authData){
            $location.path('/');
            authService.register(authData);
        }else{
            $location.path('/landing');
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $cordovaFacebookProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
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
