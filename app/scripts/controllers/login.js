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

    $scope.passwordLogin = function() {
      if ($scope.loginForm.$invalid)
        return;

      LoginService.login($scope.email, $scope.pass).then(
        function(data) {
          $cookieStore.put('token', data.token);
          $location.path('/');
        },
        function(err) {
          console.log(err);
          $scope.err = err.data.non_field_errors.join(" ");
        }
      );
    };

    $scope.createAccount = function() {
      if ($scope.loginForm.$invalid)
        return;

      $scope.err = null;

      if( $scope.pass !== $scope.confirm ) {
        $scope.err = 'Passwords do not match';
      } else {
        simpleLogin.createAccount($scope.email, $scope.pass, $scope.name)
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
