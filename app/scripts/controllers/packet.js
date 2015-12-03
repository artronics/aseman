'use strict';

angular.module('asemanApp')
    .controller('PacketCtrl',['PacketService','Restangular',function (PacketService,Restangular) {
        var self = this;

        //var packetsObj = Restangular.all('packets').getList;
        //self.packets = packetsObj.packets;
        //self.packets = {kir:'los',kos:[{kd:'dool'},{kj:'st'}]}
        self.packets = Restangular.all('packets').getList();
        console.log(self.packets);
    }]);
