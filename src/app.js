var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-spinner');
require('../.jade/templates');

var app = angular.module('MEANApp', [ 'ngRoute', 'ngSanitize', 'mean-tpl', 'angularSpinner' ]);

app.constant('VERSION', require('package.version'));

require('./app/pages/HomePage');
require('./app/pages/ItemsPage');
require('./app/services');

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl: 'pages/HomePage/HomePage.tpl',
        controller: 'HomePage'
    });

    $routeProvider.when('/items', {
        templateUrl: 'pages/ItemsPage/ItemsPage.tpl',
        controller: 'ItemsPage'
    });

});

app.run(function($rootElement, Config) {
    Config.init($rootElement[0].attributes['data-app-config'].value);
});