'use strict';
/**
 * @ngdoc function
 * @name wishlistsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('wishlistsApp')
  .controller('LoginCtrl', function ($scope, $location, $http, $window, LoginService) {

    $scope.passwordLogin = function(username, password) {
      LoginService.post({ username: username, password: password }).then(
        function(data) {
          console.log(data.token);
          $window.sessionStorage.token = data.token;
          //$http.defaults.headers.common['Authorization'] = 'JWT ' + data.token;
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

  });
