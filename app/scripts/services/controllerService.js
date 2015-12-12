'use strict';

angular.module('asemanApp')
    .factory('ControllerService', ['Restangular', function (Restangular) {

        return Restangular
            .withConfig(function (RestangularConfigurer) {
                RestangularConfigurer
                    .addResponseInterceptor(
                        function (data, operation, what, url, response, deferred) {
                            var extractedData;
                            // .. to look for getList operations
                            if (operation === "getList") {
                                // .. and handle the data and meta data
                                //extractedData = [];
                                extractedData = data.controllers;
                            } else {
                                extractedData = data.controllers;
                            }
                            return extractedData;
                        })
                ;
            })
            .service('controllers')
    }]);
