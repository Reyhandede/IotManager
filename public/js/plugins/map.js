
/*

    data:{
        sensor : "STRING"  ::  "position" 
        zoom   : INTEGER   ::  1
        label  : "Araç Konumu"

        ??? icon  :"STRING"  ::  "red"
    }

*/
App.ui.map = function (data, parent) {
    var el = document.createElement("div");
    el.style.width = "425px"
    el.style.height = "312px"
    parent.append(el);

    map = L.map(el).setView([0, 0], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    marker = L.marker([0, 0], { title: data.label }).addTo(map)
        .bindPopup(data.label)
        .openPopup();
    //marker.setLatLng([51.504, -0.09])
    //map.setView([51.505, -0.09], 14 )

    map._update_ = () => {
        Ajax.Json("/api/v1/get/" + data.token + "/" + data.sensor, { sensor: data.sensor, last: 1 }).then(e => {
            marker.setLatLng(e[0])
            map.setView(e[0])
        });
    }

    window.debug.map = map;
    window.debug.marker = marker;

    setInterval(e => {
        map._update_()
    }, 2000);



    return map;
}