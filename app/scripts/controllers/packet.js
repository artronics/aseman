'use strict';

angular.module('asemanApp')
    .controller('PacketCtrl',['PacketService','Restangular',function (PacketService,Restangular) {
        var self = this;

        //var packetsObj = Restangular.all('packets').getList;
        //self.packets = packetsObj.packets;
        self.packets = Restangular.all('packets').getList();
    }]);
