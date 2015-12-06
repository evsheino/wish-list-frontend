'use strict';

/**
 * @ngdoc function
 * @name wishlistsApp.controller:ViewListCtrl
 * @description
 * # ViewListCtrl
 * Controller of the wishlistsApp
 */
angular.module('wishlistsApp')
.controller('ViewListCtrl', function ($scope, $routeParams, Users, Categories, Gifts, LoginService) {
    Users.one($routeParams.userId).getList('gifts').then(function(list) {
        $scope.entries = list;
    });

    $scope.categories = {};
    $scope.editMode;

    // Update the entry
    $scope.markAsBought = function(gift) {
        gift.put().then(
            function() {
                $scope.msg = 'Updated successfully';
                $scope.editMode = null;
            },
            function(err) { $scope.err = err; });
    };
});
