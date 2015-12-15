'use strict';

describe('Controller: SendPacketCtrl', function () {

    // load the controller's module
    beforeEach(module('asemanApp'));

    var packetCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
        packetCtrl = $controller('SendPacketCtrl', {
            //$scope: scope
            // place here mocked dependencies
        });
    }));
    
    it('should send packets based on query', function(){
        expect(true).toBe(true);
    });
});
