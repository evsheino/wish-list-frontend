'use strict';

/**
 * @ngdoc overview
 * @name wishlistsApp
 * @description
 * # wishlistsApp
 *
 * Main module of the application.
 */
angular
  .module('wishlistsApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://ancient-hamlet-3885.herokuapp.com/');
  });
