'use strict';

angular.module('asemanApp')
    .controller('PacketCtrl', ['packet','$interval', function (PacketService,$interval) {
        var self = this;

        var packet = {
            id: '',
            netId: '',
        };
        self.packets=[];

        self.lastPacketId = 1;

        self.appendPacket = function (packets) {
            console.log(packets);
            for (var i = 0; i < packets.length; i++) {
                self.packets.push(packets[i]);
            }
        };

        self.getNewPackets = function (lastPacketId) {
            PacketService.getList({lastPacketId: lastPacketId}).then(function (data) {
                //plain() for getting unrestangularized objects
                //self.receivedPackets = data.plain();

                console.log(self.lastPacketId);
                self.appendPacket(data.plain());
                self.lastPacketId = data.lastPacketId;

            });
        };

        $interval(self.getNewPackets(self.lastPacketId),1000);


        //self.getNewPackets1


        console.log(self.packets);

        //self.packets = packetObjects;
        //self.packets = [];
        //
        //self.packets.push(packet);

        //self.packets = PacketService.getList().$object;
        //console.log('here',self.packets);
    }]);
