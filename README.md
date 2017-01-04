# EaseMee

## Discription

This is realtime location sharing service.
Easily you can meet up with friends.


![](https://github.com/DaichiMiyajima/EaseMee/blob/master/www/img/EaseMee.png)


## Version

2. ionic: 1.3.1
3. ionic CLI: 6.2.0
3. cordova:android 5.1.1, ios 6.2.0 
4. angular: 1.5.3
5. firebase: SPARK
6. node.js: 4.4.4

## Devise

1. ios
2. Android



##TO START

#### ①Install Plugin and Platform

    ionic platform add ios
    
    cordova plugin add cordova-plugin-inappbrowser
    
    cordova plugin add cordova-plugin-device-orientation
    
    cordova plugin add cordova-plugin-geolocation
    
    cordova plugin add https://github.com/phonegap-googlemaps-plugin/cordova-plugin-googlemaps --variable API_KEY_FOR_IOS="AIzaSyAgRBnkDt1hWVJrV3xU91EsrhEysYx1rC8"
    
    cordova plugin add cordova-plugin-whitelist
    
    cordova plugin add cordova-plugin-console
    
    cordova plugin add cordova-plugin-touch-id
    
    ionic plugin add plugins-dev/gpsFetchPlugin
    
    ionic resources --icon
    
    ionic platform remove ios
    
    ionic platform add ios


#### ②Change settings of XCODE

    1. Open Xcode Project
    2. General > Singning > team
         Set Team
    3. General > Deployment Info > Deployment Target
         Set 10.2
    4. Capabilities > Background Modes > Modes > Location Updates
         Check
    5. Info > Custom iOS Target Properties
         add "Privacy - Location Always Usage Description" key
