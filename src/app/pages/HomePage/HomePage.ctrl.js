module.exports = function ($scope, Config) {

    var setScope = function () {
        $scope.loading = Config.fetchState();
        $scope.pageTitle = Config.fetchConfig('appTitle');
    };

    setScope();

    // Event listeners

    $scope.$on('GOT_CONFIG', function () {
        setScope();
    });

};