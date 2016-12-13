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


##Cordova

cordova plugin add cordova-plugin-inappbrowser

cordova plugin add cordova-plugin-device-orientation

cordova plugin add cordova-plugin-geolocation

cordova plugin add https://github.com/phonegap-googlemaps-plugin/cordova-plugin-googlemaps --variable API_KEY_FOR_IOS="AIzaSyAgRBnkDt1hWVJrV3xU91EsrhEysYx1rC8"

cordova plugin add cordova-plugin-whitelist

cordova plugin add cordova-plugin-console

cordova plugin add cordova-plugin-touch-id



##TO START
ionic platform add ios

cordova plugin add cordova-plugin-inappbrowser

cordova plugin add cordova-plugin-device-orientation

cordova plugin add cordova-plugin-geolocation

cordova plugin add https://github.com/phonegap-googlemaps-plugin/cordova-plugin-googlemaps --variable API_KEY_FOR_IOS="AIzaSyAgRBnkDt1hWVJrV3xU91EsrhEysYx1rC8"

cordova plugin add cordova-plugin-whitelist

cordova plugin add cordova-plugin-console

cordova plugin add cordova-plugin-touch-id

ionic resources --icon

ionic platform remove ios
ionic platform add ios
