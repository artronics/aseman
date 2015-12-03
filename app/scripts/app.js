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
      'ui.grid'
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
  });

