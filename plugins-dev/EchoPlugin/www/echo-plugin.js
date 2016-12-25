var exec = require('cordova/exec');

exports.echo = function(sendMsg, success, error) {
    exec(success, error, "EchoPlugin", "echo", [sendMsg]);
};


