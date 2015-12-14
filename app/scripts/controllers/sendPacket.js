'use strict';
/*jslint bitwise: true */
angular.module('asemanApp')
    .controller('SendPacketCtrl',
        ['ConfigService', 'ControllerService', 'PacketService','packet',
            function (ConfigService, ControllerService, PacketService,packetProvider) {

                var self = this;
                self.foo = 'bar';

                self.packet = packetProvider.builder()
                    .setSrcIp('localhost:8080')
                    .setDstIp('localhost:6464')
                    .setSrcShortAdd(10)
                    .setDstShortAdd(30)
                    .build();

                self.status = {
                    isStarted: false,
                    numOfQueries: 10,
                    delay: 300,
                    numOfSent: 0,
                    numOfSucceed: 0,
                    numOfFailed: 0
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
