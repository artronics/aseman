'use strict';

angular.module('asemanApp')
    .controller('dbConfigCtrl', ['configService', function (configService) {
        var self = this;

        self.db= configService.db;
    }]);