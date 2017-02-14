'use strict';

$(function(){
    var elChooseLocBtn = $('#btnChooseLoc');
    var elLocation = $('#inpLocation');
    var elMap = $('#divMap');
    var map = L.map('divMap');
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

    elChooseLocBtn.on('click', function(ev){
        if (elMap.is(':visible')) {
            elMap.fadeOut();
        } else {
            elMap.fadeIn();
            var lat = -9.1, lng = 34.0;
            var coords, marker;

            if (elLocation.val()) {
                coords = elLocation.val().split(',');
                if (coords.length === 2) {
                    lat = parseFloat(coords[0]);
                    lng = parseFloat(coords[1]);
                    if (isNaN(lat) || isNaN(lng)) {
                        lat = -9.1;
                        lng = 34.0;
                    }
                }
            }
            map.setView([lat, lng], 8);
            if (marker) {
                map.removeLayer(marker);
            }
            marker = L.marker([lat, lng], { draggable: true }).addTo(map);
            marker.on('dragend', function(ev){
                elLocation.val(ev.target._latlng.lat + ',' + ev.target._latlng.lng);
            });
        }
    });
});
