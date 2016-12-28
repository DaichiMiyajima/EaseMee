var exec = require('cordova/exec');

exports.gpsFetch = function(arg0, success, error) {
    exec(success, error, "gpsFetchPlugin", "gpsFetch", [arg0]);
};
