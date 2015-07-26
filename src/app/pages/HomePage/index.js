var app = require('angular').module('MEANApp');
require('../../services');
require('../../components/Nav');

app.controller('HomePage', require('./HomePage.ctrl'));