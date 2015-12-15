'use strict';

angular.module('asemanApp')
    .service('packets', ['Restangular', function (Restangular) {
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
                                extractedData = data.packets;
                                extractedData.lastPacketId = data.lastPacketId;
                                //extractedData.packets = data.packets;
                            } else {
                                extractedData = data.packets;
                            }
                            return extractedData;
                        })
                ;
            })
            .service('packets')
            ;

    }]);
