'use strict';

angular.module('asemanApp')
    .factory('PacketService', ['Restangular', function (Restangular) {

        //var Service = {};
        //Service.packets = [];
        //    //self.packets = [];
        //Service.getAllPackets= function(){
        //        var responsePromise = $http.get('http://localhost:8080/rest/packets');
        //        responsePromise.success(function(data, status, headers, config) {
        //                Service.packets = data.packets;
        //                console.log(Service.packets);
        //        });
        //        responsePromise.error(function(data, status, headers, config) {
        //                alert("AJAX failed!");
        //        });
        //
        //};
        //
        //return Service;
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
