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
    })
;

