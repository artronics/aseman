'use strict';

angular.module('asemanApp')
    .controller('PacketCtrl',[function () {
        var self = this;
        self.packets = [{type:'kir'},{type:'kos'}];
    }]);
