'use strict';

angular.module('asemanApp')
    .controller('SendPacketCtrl',['ControllerService',function (ControllerService) {
        var self = this;
        self.packet={
            type:'DATA',
            srcIp:'localhost',
            dstIp:'localhost',
            srcShortAdd:0,
            dstShortAdd:0,
            ttl:20,
            nextHop:0,
            content:[]
        }

        ControllerService.getList({status:'CONNECTED'}).then(function (data) {
            self.controllers = data.plain();
        });
    }]);
