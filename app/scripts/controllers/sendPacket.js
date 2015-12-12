'use strict';

angular.module('asemanApp')
    .controller('SendPacketCtrl',['ControllerService',function (ControllerService) {
        var self = this;

        ControllerService.getList({status:'CONNECTED'}).then(function (data) {
            self.controllers = data.plain();
        });
    }]);
