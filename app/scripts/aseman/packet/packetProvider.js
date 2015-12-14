'use strict';

angular.module('aseman')
    .provider('packet', [function () {
        this.foo = 'bar';

        this.$get = function () {
            var service = {};

            service.create = function (packet, payload) {

                var content = constructContent(packet, payload);
                packet.content = content;

                packet.createdAt = Date.now();
                return packet;
            };
            service.builder = function ()
            {
                var packet =
                {
                    srcShortAdd: 0,
                    dstShortAdd: 0,
                    type: 'DATA',
                    netId: 1,
                    ttl: 20,
                    nextHop: 0,
                    content: [],
                    srcIp: 'localhost',
                    dstIp: 'localhost',
                    createdAt: '',
                };
                var payload=null;

                return {
                    setType: function (a) {
                        packet.type = angular.uppercase(a);
                        return this;
                    },
                    setSrcShortAdd:function(a){
                        packet.srcShortAdd=a;
                        return this;
                    },
                    setDstShortAdd: function (a) {
                        packet.dstShortAdd = a;
                        return this;
                    },
                    setSrcIp: function (a) {
                        packet.srcIp = a;
                        return this;
                    },
                    setDstIp: function (a) {
                        packet.dstIp = a;
                        return this;
                    },
                    setPayload: function (a) {
                        payload = a;
                        return this;
                    },

                    build:function(){
                        packet = service.create(packet,payload);
                        return packet;
                    }
                };
            }

            return service;
        }
        var constructContent = function (packet, payload) {
            var payloadContent = [];
            if(payload ===undefined | payload===null){

            }
            else if (payload.constructor === Array) {
                if (payload.length < 10) {
                    throw new Error('Payload length must be bigger than 10');
                }
                payloadContent = payload
            }
            else if (payload > 9) {
                for (var i = 0; i < payload; i++) {
                    payloadContent.push(i);
                }
            }
            else {
                throw new Error("Payload must be a integer bigger than 10 or an array with size of bigger than 10.")
            }

            var headerLen = 10;
            var len = headerLen + payloadContent.length;

            var getHighByte = function (address) {
                var high = ((address >> 8) & 0x000000FF);
                return high;
            };
            var getLowByte = function (address) {
                var low = (address & 0x000000FF);
                return low;
            };
            var getTypeValue = function (typeStr) {
                typeStr = angular.uppercase(typeStr);
                switch (typeStr) {
                    case 'DATA':
                        return 0;
                    case 'MALFORMED':
                        return 1;
                    case 'REPORT':
                        return 2;
                    case 'BEACON':
                        return 3;
                    case 'RL_REQ':
                        return 128;
                    case 'RL_RES':
                        return 4;
                    case 'OPN_PT':
                        return 5;
                    default:
                        throw new Error('There is no packet type: '+typeStr);
                }
            };
            var content = [
                len,
                packet.netId,

                getHighByte(packet.srcShortAdd),
                getLowByte(packet.srcShortAdd),

                getHighByte(packet.dstShortAdd),
                getLowByte(packet.dstShortAdd),

                getTypeValue(packet.type),

                packet.ttl,
                getHighByte(packet.nextHop),
                getLowByte(packet.nextHop)
            ];

            for (var i = 0; i < payloadContent.length; i++) {
                content.push(payloadContent[i]);
            }

            return content;
        };
    }])

;
