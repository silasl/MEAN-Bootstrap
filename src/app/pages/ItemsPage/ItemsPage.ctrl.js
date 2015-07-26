module.exports = function($scope, Config, Item) {

    var setScope = function () {
        $scope.pageTitle = Config.fetchConfig('appTitle');
        $scope.itemsLoading = Item.fetchState();
        $scope.items = Item.fetchItems();
        $scope.newItem = {};
    };

    Item.init();

    $scope.insertItem = function(e){
        Item.saveItem($scope.newItem);
    };

    // Event listeners

    $scope.$on('GOT_CONFIG', function () {
        Item.init();
    });

    $scope.$on('GOT_ITEMS', function () {
        setScope();
    });

    $scope.$on('SAVED_ITEM', function () {
        Item.init();
    });

};