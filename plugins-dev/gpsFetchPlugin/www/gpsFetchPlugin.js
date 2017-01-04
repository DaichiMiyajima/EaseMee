var exec = require('cordova/exec');

exports.gpsFetch = function(userid, gpsurl, success, error) {
    exec(success, error, "gpsFetchPlugin", "gpsFetch", [userid, gpsurl]);
};

exports.openSetting = function(errorcd, success, error) {
    exec(success, error, "gpsFetchPlugin", "openSetting", [errorcd]);
};