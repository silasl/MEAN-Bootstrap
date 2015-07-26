module.exports = function ($rootScope, $http) {

    var _items = {},
        _state = false,
        _url = '/api/items',

        _get = function(onSuccess){
            $http.get(_url).
                success(function(data) {
                    onSuccess(data);
                }).
                error(function(data) {
                    console.log(data);
                });
        },

        _post = function(data, onSuccess){
            $http.post(_url, data).
                success(function(data) {
                    onSuccess(data);
                }).
                error(function(data) {
                    console.log(data);
                });
        };

    return {
        init: function () {
            _state = true;
            _get(function (data) {
                _items = data;
                _state = false;
                $rootScope.$broadcast('GOT_ITEMS', _items);
            });
        },

        fetchState: function(){
            return _state;
        },

        fetchItems: function(prop){
            return prop ? _items[prop] : _items;
        },

        saveItem: function(item){
            _state = true;
            _post(item, function () {
                _state = false;
                $rootScope.$broadcast('SAVED_ITEM', _items);
            });
        }
    };

};