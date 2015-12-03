'use strict';

angular.module('asemanApp')
    .controller('PacketCtrl',['PacketService','Restangular',function (PacketService,Restangular) {
        var self = this;

        var packetObjects = PacketService.getList().$object;
        console.log(packetObjects);
        self.packets = packetObjects;
        //self.packets = [];
        //
        //var packet = {
        //    id:1,
        //    netId:12,
        //};
        //self.packets.push(packet);

        //self.packets = PacketService.getList().$object;
        //console.log('here',self.packets);
    }]);
