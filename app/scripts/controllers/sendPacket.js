'use strict';
/*jslint bitwise: true */
angular.module('asemanApp')
    .controller('SendPacketCtrl',
        ['ConfigService', 'ControllerService', 'PacketService',
            function (ConfigService, ControllerService, PacketService) {

                var self = this;

                self.status = {
                    isStarted: false,
                    numOfQueries: 10,
                    delay: 300,
                    numOfSent: 0,
                    numOfSucceed: 0,
                    numOfFailed: 0
                };

                self.packet = {
                    type: 'DATA',
                    srcIp: 'localhost',
                    dstIp: 'localhost',
                    srcShortAdd: 0,
                    dstShortAdd: 0,
                    netId: 1,
                    ttl: 20,
                    nextHop: 0,
                    content: []
                };
                self.payloadLen = 10;

                var constructContent = function (packet, payloadlen) {
                    var len = 10 + payloadlen;

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
                    for (var i = 10; i < len; i++) {
                        content.push(i - 10);
                    }

                    return content;
                };

                //self.queryPackets=
                var createDataPacket=function(packet,payloadLen){
                    packet.content = constructContent(packet,payloadLen);
                };
                var postPacket = function (packet) {
                    //PacketService.post(packet);
                    console.log(packet);
                };

                self.sendPacket= function () {
                    if (self.status.isStarted){
                        alert('You can not send packet because there are pending queries.');
                        console.log('There is already queries in queue.');
                        return;
                    }
                    else{
                        self.status.isStarted=true;
                    }

                    var packetFactory;
                    switch (self.packet.type){
                        case 'DATA':
                            packetFactory=createDataPacket;
                            break;

                        default:
                            console.log('there is no defined factory.');
                    }

                    var sendQuery=function(){

                    };


                };

                ControllerService.getList({status: 'CONNECTED'}).then(function (data) {
                    self.controllers = data.plain();
                });
            }]);
