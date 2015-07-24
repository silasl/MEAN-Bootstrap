/*
 *
 * This is used to build the bundle with browserify.
 *
 */
var MEANApp = require('../../app');

if (typeof global.window.define == 'function' && global.window.define.amd) {
    global.window.define('MEANApp', function () { return MEANApp; });
} else if (global.window) {
    global.window.MEANApp = MEANApp;
}