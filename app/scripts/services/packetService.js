'use strict';

angular.module('asemanApp')
    .factory('PacketService',['Restangular',function (Restangular) {
        var packets = Restangular.service('packets');

        return packets;
    }]);
