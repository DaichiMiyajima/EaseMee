var exec = require('cordova/exec');

exports.gpsfetch = function(arg0, success, error) {
    exec(success, error, "gpsFetch", "coolMethod", [arg0]);
};
