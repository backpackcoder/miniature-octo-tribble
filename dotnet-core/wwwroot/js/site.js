var g_map = null;
var icon_church = L.icon({
    iconUrl: '/images/church.png',

    iconSize:     [16, 16], // size of the icon
    iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -8] // point from which the popup should open relative to the iconAnchor
});

var g_marker = null;

if ($('#map').length != 0) {
    resizeMap();
    $(window).on('resize', resizeMap);
    g_map = L.map('map', { maxZoom: 17 });
    if (g_churches.length == 1) {
        g_map.setView([g_churches[0].lat, g_churches[0].lng], 17);
     } else {
         g_map.setView([-9.256255, 33.645391], 9);
    }
    
    L.esri.basemapLayer('Imagery').addTo(g_map);
    L.esri.basemapLayer('ImageryLabels').addTo(g_map);

    for(var i=0; i < g_churches.length; i++) {
        var church = g_churches[i];
        g_marker = L.marker([church.lat, church.lng], {icon: icon_church}).addTo(g_map).bindPopup(church.name);
    }

    if ( $('#inpLat').length === 1 && $('#inpLng').length === 1) {
        g_map.on('click', function(ev) {
            $('#inpLat').val(ev.latlng.lat);
            $('#inpLng').val(ev.latlng.lng);
            if (g_marker) { 
                g_map.removeLayer(g_marker);
            }
            g_marker = L.marker([ev.latlng.lat, ev.latlng.lng], {icon: icon_church}).addTo(g_map);
        });
    }
}

function resizeMap() {
    var ht = $(window).height() - $('.navbar-fixed-top').height() - $('footer').height() - 95;
    $('#map,#datatable').height(ht); 
}
