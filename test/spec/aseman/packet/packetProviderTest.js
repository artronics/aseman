'use strict';

describe('packetProvider', function () {

    var provider;

    //beforeEach(module('aseman'));

    beforeEach(function() {
        var dummyModule = angular.module('dummyModule', []);

        dummyModule.config( function (packetProvider) {
            provider = packetProvider;
        });
        // Initialize test.app injector
        module('aseman', 'dummyModule');

        // Kickstart the injectors previously registered
        // with calls to angular.mock.module
        inject(function () {});
    });

    describe('packet builder', function () {

        it('should build a packet as default', function(){
            var packet = provider.$get().builder().build();
            expect(packet.srcShortAdd).toBe(0);
            expect(packet.content.length).toBe(10);//if default packet content is just header
        });

        it('should build a packet by provided data',function(){
            var packet = provider.$get().builder()
                .setType('DATA')
                .setSrcShortAdd(5)
                .setDstShortAdd(10)
                .setSrcIp('1.1.1.1')
                .setDstIp('2.2.2.2')
                .build();
            expect(packet.srcShortAdd).toBe(5);
            expect(packet.dstShortAdd).toBe(10);
            expect(packet.srcIp).toBe('1.1.1.1');
            expect(packet.dstIp).toBe('2.2.2.2');
            expect(packet.type).toBe('DATA');
        });
    })

    var packet=
    {
        srcShortAdd:30,
        dstShortAdd:257,
        type:'DATA',
        netId:1,
        ttl:20,
        nextHop:0,
        content:[],
        srcIp:'',
        dstIp:'',
        createdAt:'',
    };
    var payloadArr=[0,1,2,3,4,5,6,7,8,9];

    it('pass test' , function () {
        expect(provider.foo).toBe('bar');
    });

    it('should put payload as it is, if payload is array', function(){
        var createdPacket = provider.$get().create(packet,payloadArr);
        expect(createdPacket.content.length).toBe(20);
        for(var i=0; i<payloadArr.length; i++){
            expect(createdPacket.content[10+i]).toBe(i);
        }
    });

    it('should create dummy payload if payload is an integer', function(){
        var createdPacket = provider.$get().create(packet,10);
        for(var i=0; i<payloadArr.length; i++){
            expect(createdPacket.content[10+i]).toBe(i);
        }
    });

    it('should throw exp if packet type is known', function(){
        var packet=
        {
            srcShortAdd:30,
            dstShortAdd:257,
            type:'FOO',
            netId:1,
            ttl:20,
            nextHop:0,
            content:[],
            srcIp:'',
            dstIp:'',
            createdAt:'',
        };
        expect(function(){provider.$get().create(packet,10)}).toThrow();
    });

    it('should create createdAt time stamp', function(){
        var createdPacket = provider.$get().create(packet,10);
        expect(createdPacket.createdAt).not.toEqual(null);
    });

    it('should create a header if payload is not presented', function(){
        var createdPacket = provider.$get().create(packet);
        expect(createdPacket.content.length).toBe(10);
    });

    it('should create a header if payload is null', function(){
        var createdPacket = provider.$get().create(packet);
        expect(createdPacket.content.length).toBe(10);
    });

    it('should throw exp if payload is not array with length higher that 9', function () {
        var payload =[0,1,2,3,4,5,6,7,8];
        expect( function(){ provider.$get().create(packet,payload); } ).toThrow(new Error('Payload length must be bigger than 10'));

        var payload = 8;
        expect( function(){ provider.$get().create(packet,payload); } ).toThrow(new Error('Payload must be a integer bigger than 10 or an array with size of bigger than 10.'));
    })
});
