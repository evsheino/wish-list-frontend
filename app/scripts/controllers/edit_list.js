'use strict';

/**
 * @ngdoc function
 * @name wishlistsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wishlistsApp
 */
angular.module('wishlistsApp')

  .controller('EditListCtrl', function ($scope, $location, Users, Categories, Gifts, LoginService) {
    var user = LoginService.getCurrentUser();

    if (!user) {
      $location.path("/login");
      return;
    }

    $scope.editMode = false;

    Categories.getList().then(function(categories) {
      $scope.categories = categories;
    });
    Users.one(user.user_id).getList('gifts').then(function(gifts) {
      $scope.entries = gifts;
    });

    $scope.save = function(gift) {
      Gifts.one(gift.id).doPUT(gift).then(
        function() { 
          $scope.msg = "Updated successfully";
          $scope.editMode = false;
        }, 
        function(err) { $scope.err = err; });
    };
  });
