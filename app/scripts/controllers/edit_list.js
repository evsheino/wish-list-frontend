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

    $scope.editMode;
    var stashedGift;

    Categories.getList().then(function(categories) {
      $scope.categories = categories;
    });
    Users.one(user.user_id).getList('gifts').then(function(gifts) {
      $scope.entries = gifts;
    });

    $scope.editModeCheck = function(index) {
      return $scope.editMode == index;
    };

    $scope.startEdit = function(index) {
      if (stashedGift && stashedGift.index != index) {
        $scope.cancelEdit();
      }

      stashedGift = { index: index, gift: angular.copy($scope.entries[index]) };
      $scope.editMode = index;
    };

    $scope.cancelEdit = function() {
      $scope.entries[stashedGift.index] = angular.copy(stashedGift.gift);
      stashedGift = null;
      $scope.editMode = null;
    };

    $scope.save = function(gift) {
      Gifts.one(gift.id).doPUT(gift).then(
        function() { 
          $scope.msg = "Updated successfully";
          $scope.editMode = null;
        }, 
        function(err) { $scope.err = err; });
    };
  });
