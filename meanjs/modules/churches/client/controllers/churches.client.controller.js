(function () {
  'use strict';

  // Churches controller
  angular
    .module('churches')
    .controller('ChurchesController', ChurchesController);

  ChurchesController.$inject = ['$scope',
    '$state',
    '$window',
    'Authentication',
    'churchResolve',
    'leafletBoundsHelpers',
    'leafletMapEvents',
    'mapService'];

  function ChurchesController($scope,
    $state,
    $window,
    Authentication,
    church,
    leafletBoundsHelpers,
    leafletMapEvents,
    mapService) {
    var vm = this;
    //vm.authentication = Authentication;
    vm.church = church;
    vm.error = null;
    vm.form = {};
    vm.save = save;

    if (vm.church && vm.church.$promise) {
      vm.church.$promise.then(function (data) {
        angular.extend($scope, {
          center: {
            lat: data.lat,
            lng: data.lng,
            zoom: 14
          },
          markers: {
            main_marker: mapService.getMarker(data)
          }
        });
      });
    } else {
      mapService.center($scope, 0.0, 0.0, 5);
    }
    mapService.create($scope);

    // Save Church
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.churchForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.church._id) {
        vm.church.$update(successCallback, errorCallback);
      } else {
        vm.church.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('churches.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
} ());
