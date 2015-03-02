'use strict';

/**
 * @ngdoc function
 * @name wishlistsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wishlistsApp
 */
angular.module('wishlistsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
