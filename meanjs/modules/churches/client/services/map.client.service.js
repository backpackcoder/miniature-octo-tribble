(function () {
  'use strict';

  angular
    .module('churches')
    .factory('mapService', mapService);

  function mapService() {
    var icon_church = {
      iconUrl: '/modules/churches/client/img/church.png',
      iconSize: [16, 16], // size of the icon
      iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
    };

    // Public API
    return {
      getMarker: function (church) {
        return {
          name: church.name,
          lat: church.lat,
          lng: church.lng,
          title: church.name,
          message: church.name,
          icon: icon_church,
          focus: false,
          draggable: false
        };
      }, // getMarker

      create: function ($scope) {
        angular.extend($scope, {
          bounds: {},
          center: {},
          markers: {},
          tiles: {
            url: 'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          }
        });
      }, // create

      center: function ($scope, lat, lng, zoom) {
        if (!zoom) { zoom = 17; }
        angular.extend($scope, {
          center: {
            lat: lat,
            lng: lng,
            zoom: zoom
          }
        });
      } // center
    };  /* Public API */

  } // mapService
})();
