
/*

    data:{
        sensor :"STRING"  ::  "temperature" 
        zoom   :INTEGER   ::  1
        ??? icon  :"STRING"  ::  "red"
    }

*/
App.ui.map = function (data, parent) {
    var el = document.createElement("div");
    el.style.width = "100%"
    el.style.height = "300px"
    parent.append(el);




    let map = new OpenLayers.Map();
    var mapnik = new OpenLayers.Layer.OSM();
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position = new OpenLayers.LonLat(0, 0).transform(fromProjection, toProjection);
    let zoom = data.zoom || 15;

    //map.setTarget(el);


    map.addLayer(mapnik);
    map.setCenter(position, zoom);
    // Otomatik Boyutlandırma ~  gibi bir şey
    map.updateSizeDestroy();
    // map.setCenter(new OpenLayers.LonLat(13.41,52.52), zoom );


    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    let marker = new OpenLayers.Marker(new OpenLayers.LonLat(0, 0));
    markers.addMarker(marker);



    map._update_ = () => {
        Ajax.Json("/api/v1/get/" + data.token + "/" + data.sensor, { sensor: "position", last: 1 }).then(e => {
            console.log(e[0].lon, e[0].lat)
            position = new OpenLayers.LonLat(e[0].lon, e[0].lat)

            map.setCenter(position, zoom);
            marker.lonlat = position;
            map.render(el);
            //marker.setCenter(new OpenLayers.LonLat(e.lon,e.lat), zoom );
            //map.
        });
    }

    window.debug.map = map;
    window.debug.marker = marker;

    setInterval(e => {
        //map._update_()
    }, 2000);



    return map;
}