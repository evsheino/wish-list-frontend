'use strict';

angular.module('wishlistsApp')
.factory('httpRequestInterceptor', function ($cookieStore, $q, $location, jwtHelper, $rootScope) {
  return {
    request: function (config) {
      var token = $cookieStore.get('token');

      if (token && jwtHelper.isTokenExpired(token)) {
        // The authentication token has expired, remove it.
        $cookieStore.remove('token');
        token = undefined;
        $rootScope.isAuthenticated = false;
      }

      // Set the Authorization header if the token exists.
      if (token) {
        config.headers.Authorization = 'JWT ' + token;
        $rootScope.isAuthenticated = true;
      }

      return config;
    },
    'responseError': function(response) {
      if(response.status === 401 || response.status === 403) {
        $location.path('/login');
      }
      return $q.reject(response);
    }
  };
});
