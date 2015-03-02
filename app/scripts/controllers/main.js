'use strict';

/**
 * @ngdoc function
 * @name wishlistsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wishlistsApp
 */
angular.module('wishlistsApp')

  .controller('MainCtrl', function ($scope, Users) {
        $scope.entries = Users.one(1).getList('gifts').$object;
        console.log($scope.entries);
  });
