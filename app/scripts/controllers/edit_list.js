'use strict';

/**
 * @ngdoc function
 * @name wishlistsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wishlistsApp
 */
angular.module('wishlistsApp')

  .controller('EditListCtrl', function ($scope, $location, Users, Categories, LoginService) {
    var user = LoginService.getCurrentUser();

    if (!user) {
      $location.path("/login");
      return;
    }

    $scope.categories = Categories.getList().$object;
    $scope.entries = Users.one(user.user_id).getList('gifts').$object;
  });
