'use strict';

describe('Controller: SendPacketCtrl', function () {

    // load the controller's module
    beforeEach(module('asemanApp'));

    var packetCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller,ConfigService, ControllerService, PacketService,packet,$timeout) {
        packetCtrl = $controller('SendPacketCtrl', {
            //$scope: scope
            // place here mocked dependencies
        });
    }));
    
    it('should send packets based on query', function(){
        expect();
    });
});
