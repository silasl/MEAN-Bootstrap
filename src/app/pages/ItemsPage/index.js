var app = require('angular').module('MEANApp');
require('../../services');
require('../../components/Nav');

app.controller('ItemsPage', require('./ItemsPage.ctrl'));