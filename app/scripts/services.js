'use strict';

angular.module('wishlistsApp')
  .factory('Users', function(Restangular) {
    return Restangular.service('users');
})
  .factory('Gifts', function(Restangular) {
    return Restangular.service('gifts');
})
  .factory('LoginService', function(Restangular) {
    return Restangular.service('api-token-auth/');
})
;
