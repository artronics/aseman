'use strict';

/**
 * @ngdoc overview
 * @name asemanApp
 * @description
 * # asemanApp
 *
 * Main module of the application.
 */
angular
    .module('asemanApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.grid',
        'restangular'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    .config(function (RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:8080/rest');

        RestangularProvider.setRestangularFields({
            selfLink: 'self.href',
        });

        RestangularProvider
            .setResponseExtractor(function(response) {
                var newResponse = response;
                if (angular.isArray(response)) {
                    angular.forEach(newResponse, function(value, key) {
                        newResponse[key].originalElement = angular.copy(value);
                    });
                } else {
                    newResponse.originalElement = angular.copy(response);
                }

                return newResponse;
            });
        // add a response interceptor
        //RestangularProvider.addResponseInterceptor(
        //    function (data, operation, what, url, response, deferred) {
        //        var extractedData;
        //        // .. to look for getList operations
        //        if (operation === "getList") {
        //            // .. and handle the data and meta data
        //            extractedData = data.packets;
        //            extractedData.lastPacketId = data.lastPacketId;
        //            //extractedData.error = data.error;
        //            //extractedData.paging = data.paging;
        //        } else {
        //            extractedData = data.data;
        //        }
        //        return extractedData;
        //    });
    })
;

