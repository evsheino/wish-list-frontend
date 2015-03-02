'use strict';

angular.module('wishlistsApp')
.factory('httpRequestInterceptor', function ($cookieStore) {
  return {
    request: function (config) {

      // Set the Authorization header if token has been saved before.
      var token = $cookieStore.get('token');
      if (token)
        config.headers.Authorization = 'JWT ' + token;

      return config;
    },
    'responseError': function(response) {
      if(response.status === 401 || response.status === 403) {
        // The authentication token is invalid, remove it.
        $cookieStore.remove('token');
        return config;
      }
      return $q.reject(response);
    }
  };
});
