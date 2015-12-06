'use strict';

/**
 * @ngdoc function
 * @name wishlistsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wishlistsApp
 */
angular.module('wishlistsApp')

  .controller('MainCtrl', function ($scope, Users, LoginService) {
    Users.getList().then(function(users) {
      $scope.users = users;
    });
  });
