//app.service('Config', require('../Config.srvc'));

describe('Api Actions', function () {
    var module = angular.mock.module,
        element = '<div data-app-config="/sampleConfig.json"></div>',
        sampleConfig = {
            config: 'config'
        };

    beforeEach(function(){
        module('MEANApp');

        module(function($provide) {
            $provide.value('$rootElement', angular.element(element));
        });
    });

    beforeEach(inject(function(Config) {
        expect(Config.fetchState()).toBe(false);
        //Config.init(sampleConfig);
    }));

    describe('configureApp', function() {
        it('should call the config endpoint', inject(function(Config) {

        }));
    });
});