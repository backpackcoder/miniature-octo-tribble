// Churches service used to communicate Churches REST endpoints
(function () {
  'use strict';

  angular
    .module('churches')
    .factory('ChurchesService', ChurchesService);

  ChurchesService.$inject = ['$resource'];

  function ChurchesService($resource) {
    return $resource('api/churches/:churchId', {
      churchId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      delete: {
        method: 'DELETE'
      }
    });
  }
}());
