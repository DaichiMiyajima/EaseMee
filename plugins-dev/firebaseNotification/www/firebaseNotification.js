var exec = require('cordova/exec');

exports.firebaseNotification = function(arg0, success, error) {
    exec(success, error, "firebaseNotification", "coolMethod", [arg0]);
};
