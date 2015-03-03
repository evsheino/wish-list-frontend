'use strict';
/**
 * @ngdoc function
 * @name wishlistsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication.
 */
angular.module('wishlistsApp')
  .controller('LoginCtrl', function ($scope, $location, $cookieStore, LoginService, jwtHelper) {

    $scope.passwordLogin = function(username, password) {
      LoginService.login(username, password).then(
        function(data) {
          $cookieStore.put('token', data.token);
          $location.path('/');
        },
        function(err) {
          console.log(err);
          $scope.err = err;
        }
      );
    };

    $scope.createAccount = function(username, pass, confirm, name) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        simpleLogin.createAccount(username, pass, name)
          .then(function() {
            $location.path('/account');
          }, function(err) {
            $scope.err = err;
          });
      }
    };

  })
  .controller('LogoutCtrl', function ($scope, $location, LoginService) {
    LoginService.logout();
    $location.path('/');
  });
