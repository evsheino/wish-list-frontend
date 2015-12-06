'use strict';

/**
 * @ngdoc function
 * @name wishlistsApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the wishlistsApp
 */
angular.module('wishlistsApp')
.controller('HeaderCtrl', function ($scope, $route) {
    $scope.$route = $route;
});

