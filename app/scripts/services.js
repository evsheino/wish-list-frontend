'use strict';

angular.module('wishlistsApp')
  .factory('Users', function($resource) {
    var URL = 'http://ancient-hamlet-3885.herokuapp.com/users'; 

    return $resource(URL);
});
