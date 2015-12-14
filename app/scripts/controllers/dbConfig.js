'use strict';

angular.module('asemanApp')
    .controller('dbConfigCtrl', ['ConfigService', function (ConfigService) {
        var self = this;

        self.db= ConfigService.db;
    }]);