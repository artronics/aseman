'use strict';

angular.module('asemanApp')
    .controller('ControllerCtrl',['ControllerService', function (ControllerService) {
       var self = this ;


        ControllerService.getList().then(function (data) {
            self.controllers = data.plain();
        });


    }]);
