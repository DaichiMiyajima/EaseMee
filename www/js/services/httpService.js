//Calling of API 

candyService.factory('httpService', function($http,configService){

    function makeRequest(method,data){
        var request = {};
        if(method == 'facebook_access_token'){
            request.query = 'facebook_access_token get request';
        }else{
            request.query = 'We cant handle this method';
        }
        return request;
    }

    function handler(_method,uri, _data, callback){

        configService(function(_config){
            $http({
                method : 'POST',
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                url : _config.globalConfig.ionicUri + uri,
                data: {
                    'request': makeRequest(_method,_data)
                }
            }).success(callback).error(function(data, status, headers, config){
                console.log(data);
                console.log(status);
                console.log(headers);
                console.log(config);

            });
        });
    }

    restAPICall = function (method, uri, data, callback) {
        // data can be left out
        if(typeof data == "function") { 
            callback = data;
            data = null;
        }
        handler(method, uri, data, callback);
    }

    var httpService = {
        restAPICall: restAPICall
    };

    return httpService;
});

