'use strict';

/**
 * @ngdoc function
 * @name wishlistsApp.controller:ViewListCtrl
 * @description
 * # ViewListCtrl
 * Controller of the wishlistsApp
 */
angular.module('wishlistsApp')
.controller('ViewListCtrl', function ($scope, $routeParams, Users, Purchases,
            Gifts, Categories, LoginService) {
    var self = this;
    self.entries = [];

    var user = LoginService.getCurrentUser();

    Categories.getList().then(function(categories) {
        categories.forEach(function(cat) {
            $scope.categories[cat.id] = cat;
        });
    });

    Users.one($routeParams.userId).getList('gifts').then(function(list) {
        self.entries = list;
    });

    $scope.categories = {};
    self.editMode;

    $scope.startPurchase = function(index) {
        $scope.editMode = index;
    };

    $scope.cancelPurchase = function() {
        $scope.editMode = null;
    };

    // Update the entry
    $scope.addPurchase = function(gift, comment) {
        var purchase = {
            gift: gift.id,
            user: user.user_id,
            comment: comment
        };
        Purchases.post(purchase).then(
            function() {
                $scope.msg = 'Updated successfully';
                self.editMode = null;
            },
            function(err) { $scope.err = err; });
    };
});
