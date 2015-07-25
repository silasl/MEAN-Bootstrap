var app = require('angular').module('MEANApp');

app.controller('Nav', function($scope) {
    $scope.navItems = [
        {
            label: 'Home',
            route: '/'
        },
        {
            label: 'Items',
            route: '/items'
        }
    ];
});
