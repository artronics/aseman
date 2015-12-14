'use strict';

describe('Controller: SendPacketCtrl', function () {

    // load the controller's module
    beforeEach(module('asemanApp'));

    var packetCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller,ConfigService, ControllerService, PacketService,packet) {
        packetCtrl = $controller('SendPacketCtrl', {
            //$scope: scope
            // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(packetCtrl.foo).toBe('bar');
    });
});
