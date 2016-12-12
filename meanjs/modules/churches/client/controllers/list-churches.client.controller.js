(function () {
  'use strict';

  angular
    .module('churches')
    .controller('ChurchesListController', ChurchesListController);

  ChurchesListController.$inject = ['$scope', '$state', '$window', 'ChurchesService', 'leafletBoundsHelpers', 'mapService'];

  function ChurchesListController($scope, $state, $window, ChurchesService, leafletBoundsHelpers, mapService) {
    var vm = this;
    // Center the map
    vm.centerMap = function (lat, lng) {
      mapService.center($scope, lat, lng);
    };

    // Remove existing Church
    vm.remove = function (church) {
      if ($window.confirm('Are you sure you want to delete?')) {
        church.$remove(function () {
          $window.location.reload();
        });
      }
    };

    vm.churches = ChurchesService.query();
    vm.churches.$promise.then(function (data) {
      var church_markers = {};
      var minx = 180, maxx = -180, miny = 90, maxy = -90;
      for (var i = 0; i < data.length; i++) {
        var church = data[i];
        minx = Math.min(church.lng, minx);
        maxx = Math.max(church.lng, maxx);
        miny = Math.min(church.lat, miny);
        maxy = Math.max(church.lat, maxy);
        church_markers['church_' + church.name] = mapService.getMarker(church);
      }
      angular.extend($scope, {
        markers: church_markers,
        bounds: leafletBoundsHelpers.createBoundsFromArray([[miny, minx], [maxy, maxx]])
      });
    }); // $promise.then

    mapService.create($scope);
  }
} ());
