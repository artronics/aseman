'use strict';
/*jslint bitwise: true */
angular.module('asemanApp')
    .controller('SendPacketCtrl',
        ['packet', 'ControllerService',
            function (packetProvider,ControllerService) {
                var self = this;

                self.queryResult={};
                //create a packet model for view
                self.packetModel = packetProvider.builder()
                    .setSrcIp('localhost:8080')
                    .setDstIp('localhost:6464')
                    .setSrcShortAdd(10)
                    .setDstShortAdd(30)
                    .setPayload(self.payloadLen)
                    .build();
                self.packetModel.payloadLen=10;

                self.query = {
                    isAvailable:false,
                    isStarted: false,
                    numOfQueries: 10,
                    delay: 1000,
                    numOfSent: 0,
                    numOfSucceed: 0,
                    numOfFailed: 0
                };

                //this creates actual packet from model for sending to server
                var createPacket=function(){
                    return packetProvider.builder()
                        .setSrcIp(self.packetModel.srcIp)
                        .setDstIp(self.packetModel.dstIp)
                        .setSrcShortAdd(self.packetModel.srcShortAdd)
                        .setDstShortAdd(self.packetModel.dstShortAdd)
                        .setPayload(self.packetModel.payloadLen)
                        .build();
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
                        self.query.isStarted=true;

                        queryResult.isAvailable=true;
                        queryResult.numOfQueries= self.query.numOfQueries;
                        queryResult.numOfFailed=0;
                        queryResult.numOfSent=0;
                        queryResult.numOfSucceed=0;
                        queryResult.delay = self.query.delay;
                        queryResult.status = "running";
                    }


                    var sendQuery=function(query,packet){
                        self.myTimeout = $timeout(self.onTimeout,self.query.delay);
                    };
                    sendQuery(self.query,self.packet);
                };

                self.stopQuery = function () {
                    $timeout.cancel(self.myTimeout);
                    self.query.isStarted=false;
                };

                self.onTimeout= function () {
                    queryResult.numOfSent++;
                    postPacket(createPacket());
                    if (queryResult.numOfQueries===queryResult.numOfSent){
                        self.stopQuery();
                    }
                    else{
                        self.myTimeout = $timeout(self.onTimeout,self.query.delay);
                    }
                };
                ControllerService.getList({status: 'CONNECTED'}).then(function (data) {
                    self.controllers = data.plain();
                });
            }]);
