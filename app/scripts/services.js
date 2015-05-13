'use strict';

angular.module('wishlistsApp')
  .factory('Users', function(Restangular) {
    return Restangular.service('users');
})
  .factory('Gifts', function(Restangular) {
    return Restangular.service('gifts');
})
  .factory('Categories', function(Restangular) {
    return Restangular.service('categories');
})
  .factory('LoginService', function($rootScope, Restangular, $cookieStore, jwtHelper) {

      var logout = function() {
        $cookieStore.remove('token');
        $rootScope.isAuthenticated = false;
      };

    return {

      login: function(username, password) {
        return Restangular.service('api-token-auth/').post({ username: username, password: password });
      },

      logout: logout,

      getCurrentUser: function() {
        var token = $cookieStore.get('token');
        if (token)
          return jwtHelper.decodeToken(token);
      },

      refreshToken: function(refreshDelta) {
        var token = $cookieStore.get('token');

        // Refresh only if close to expiration
        if (token && jwtHelper.getTokenExpirationDate(token) - Date.now() < refreshDelta) {

          Restangular.service('api-token-refresh/').post({ token: token }).then(
            function(data) {
              // Succesfully refreshed the token
              $cookieStore.put('token', data.token);
            }, 
            function(err) {
              // Failed to refresh the token
              logout();
            }
          );
        }
      }
    }
  });
