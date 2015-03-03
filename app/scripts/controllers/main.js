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
    var user = LoginService.getCurrentUser();
    if (user)
      $scope.entries = Users.one(user.user_id).getList('gifts/').$object;
  });
