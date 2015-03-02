angular.module('wishlistsApp')
.factory('httpRequestInterceptor', function ($window) {
  return {
    request: function (config) {

      // use this to destroying other existing headers
      var token = $window.sessionStorage.token;
      if (token)
        config.headers['Authorization'] = 'JWT ' + token;

      return config;
    }
  };
});
