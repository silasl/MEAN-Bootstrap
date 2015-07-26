module.exports = function($scope, $location) {

    $scope.navItems = [
        {
            label: 'Home',
            route: '/',
            active: $location.path() === '/'
        },
        {
            label: 'Items',
            route: '/items',
            active: $location.path() === '/items'
        }
    ];

};