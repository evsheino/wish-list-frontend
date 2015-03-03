'use strict';

angular.module('wishlistsApp')
  .factory('Users', function(Restangular) {
    return Restangular.service('users');
})
  .factory('Gifts', function(Restangular) {
    return Restangular.service('gifts');
})
  .factory('LoginService', function(Restangular, $cookieStore, jwtHelper) {
    return {
      login: function(username, password) {
        return Restangular.service('api-token-auth/').post({ username: username, password: password });
      },
      logout: function(username, password) {
        $cookieStore.remove('token');
      },
      getCurrentUser: function() {
        var token = $cookieStore.get('token');
        if (token)
          return jwtHelper.decodeToken(token);
      }
    }
  });
