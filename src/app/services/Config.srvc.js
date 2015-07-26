module.exports = function ($rootScope, $http) {

    var _config = {},
        _state = false,
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
                _state = true;
                _get(url, function(data){
                    _config = data;
                    _state = false;
                    $rootScope.$broadcast('GOT_CONFIG', _config);
                });
            }
        },

        fetchState: function(){
            return _state;
        },

        fetchConfig: function(prop){
            return prop ? _config[prop] : _config;
        }
    };

};