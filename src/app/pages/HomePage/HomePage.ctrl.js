module.exports = function($scope) {

    $scope.loading = true;

    $scope.$on('GOT_CONFIG', function(event, data) {
        $scope.loading = false;
        $scope.pageTitle = data.appTitle;
    });

};