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
    'restangular',
    'angular-loading-bar',
    'angular-jwt'
  ])
  .config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/main.html',
        controller: 'LogoutCtrl'
      })
      .when('/list/edit', {
        templateUrl: 'views/edit_list.html',
        controller: 'EditListCtrl'
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
    RestangularProvider.setBaseUrl('https://ancient-hamlet-3885.herokuapp.com/');
    RestangularProvider.setRequestSuffix('/');
  });
