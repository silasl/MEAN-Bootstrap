var app = require('angular').module('MEANApp');

app.service('Config', function($rootScope, $http){
    var config = null,
        _get = function(url, onSuccess){
            $http.get(url).
                success(function(data) {
                    onSuccess(data);
                }).
                error(function(data) {
                    console.log(data);
                });
        };

    return {
        init: function (url) {
            if(url){
                _get(url, function(data){
                    config = data;
                    $rootScope.$broadcast('GOT_CONFIG', config);
                });
            }
        },

        fetchConfig: function(prop){
            return prop ? config[prop] : config;
        }
    };
});