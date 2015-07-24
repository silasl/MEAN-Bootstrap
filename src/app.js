var angular = require('angular');
require('angular-route');
require('../.jade/templates');

var app = angular.module('MEANApp', [ 'ngRoute', 'mean-tpl' ]);

app.constant('VERSION', require('package.version'));

require('./app/AppRoot');

app.config(function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'AppRoot.tpl',
        controller: 'AppRoot'
    });

});