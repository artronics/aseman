'use strict';
/*jslint bitwise: true */
angular.module('asemanApp')
    .controller('SendPacketCtrl',
        ['ConfigService', 'ControllerService', 'PacketService','packet','$timeout',
            function (ConfigService, ControllerService, PacketService,packetProvider,$timeout) {

                var self = this;
                self.foo = 'bar';
                self.packet = packetProvider.builder()
                    .setSrcIp('localhost:8080')
                    .setDstIp('localhost:6464')
                    .setSrcShortAdd(10)
                    .setDstShortAdd(30)
                    .build();

                self.query = {
                    isStarted: false,
                    numOfQueries: 10,
                    delay: 1000,
                    numOfSent: 0,
                    numOfSucceed: 0,
                    numOfFailed: 0
                };


                var postPacket = function (packet) {
                    //PacketService.post(packet);
                    console.log(packet);
                };

                self.sendPacket= function () {
                    if (self.query.isStarted){
                        alert('You can not send packet because there are pending queries.');
                        console.log('There is already queries in queue.');
                        return;
                    }
                    else{
                        //self.query.isStarted=true;
                    }


                    var sendQuery=function(query,packet){
                        self.myTimeout = $timeout(self.onTimeout,self.query.delay);

                    };
                    sendQuery(self.query,self.packet);


                };

                self.onTimeout= function () {
                    self.query.numOfSent++;
                    console.log(self.query.numOfSent);
                    if (self.query.numOfQueries==self.query.numOfSent){
                    //if(true){
                        console.log('he');
                        $timeout.cancel(self.myTimeout);
                    }
                    else{
                        self.myTimeout = $timeout(self.onTimeout,self.query.delay);
                    }
                };
                ControllerService.getList({status: 'CONNECTED'}).then(function (data) {
                    self.controllers = data.plain();
                });
            }]);
