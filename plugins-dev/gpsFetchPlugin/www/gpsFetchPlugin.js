var exec = require('cordova/exec');

exports.gpsFetch = function(userid, gpsurl, success, error) {
    exec(success, error, "gpsFetchPlugin", "gpsFetch", [userid, gpsurl]);
};

exports.openSetting = function(errorcd) {
    exec(null, null, "gpsFetchPlugin", "openSetting", [errorcd]);
};