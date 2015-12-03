'use strict';

angular.module('asemanApp')
    .factory('PacketService', ['Restangular', function (Restangular) {
        return Restangular

            .withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.addResponseInterceptor(
                    function (data, operation, what, url, response, deferred) {
                        var extractedData;
                        // .. to look for getList operations
                        if (operation === "getList") {
                            // .. and handle the data and meta data
                            extractedData = data.packets;
                            extractedData.lastPacketId = data.lastPacketId;
                            //extractedData.error = data.error;
                            //extractedData.paging = data.paging;
                        } else {
                            extractedData = data.data;
                        }
                        return extractedData;
                    })
            })
            .service('packets')
            ;

    }]);
