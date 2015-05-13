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

    $scope.categories = {};
    $scope.editMode;

    // Copy of the entry with original values being currently edited
    // for reverting changes
    var stashedGift;

    Categories.getList().then(function(categories) {
      categories.forEach(function(cat) {
        $scope.categories[cat.id] = cat;
      });
    });

    Users.one(user.user_id).getList('gifts').then(function(gifts) {
      $scope.entries = gifts;
    });

    // Check if the current entry is in edit mode
    $scope.editModeCheck = function(index) {
      return $scope.editMode == index;
    };

    // Turn on edit mode for the current entry and disable it in other entries
    $scope.startEdit = function(index) {
      if (stashedGift && stashedGift.index != index) {
        $scope.cancelEdit();
      }

      stashedGift = { index: index, gift: angular.copy($scope.entries[index]) };
      $scope.editMode = index;
    };

    // Cancel edit and revert changes to the entry
    $scope.cancelEdit = function() {
      $scope.entries[stashedGift.index] = angular.copy(stashedGift.gift);
      stashedGift = null;
      $scope.editMode = null;
    };

    // Update the entry
    $scope.save = function(gift) {
      gift.category_id = gift.category.id
      gift.put().then(
        function() { 
          $scope.msg = "Updated successfully";
          $scope.editMode = null;
        }, 
        function(err) { $scope.err = err; });
    };
  });
