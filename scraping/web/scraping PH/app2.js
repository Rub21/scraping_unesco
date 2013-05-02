var geojson = {
    "type": "FeatureCollection",
    "features": []
};

for (i = 1; i < 10; i++) {

    data = '';
    $('#widgetscript').attr('urlwidget', 'http://whc.unesco.org/en/list/' + i);
    console.log('http://whc.unesco.org/en/list/' + i);
    //get print data  
    var urlwidget = $('#widgetscript').attr('urlwidget');
    $.get(urlwidget, function(res) {

        var d = {
            "geometry": {
                "type": "Point",
                "coordinates": [0, 0]
            },
            "type": "Feature",
            "properties": {
                "name": '',
                "country": '',
                "province": '',
                "property": '',
                "criteria": '',
                "dateofinscription": '',
                "url": ''
            }
        };

        var html = res.responseText;
        // console.log($("div .content", $(html)));
        var data = $("div .content", $(html));
        //console.log(data);
        var name = $('h1', data)[0].innerText;
        if (typeof(name) !== 'undefined') {
            //console.log(name);
            d.properties.name = name;
            var aditional_data = $('div .relatedContent', data);
            console.log(aditional_data);
            d.properties.country = get_string(aditional_data[0].children[0].innerText);

            //comprueba los datos adicinales para asignar cordenadas 
            console.log(aditional_data[0].children[1].innerText);
            var cor_esp = aditional_data[0].children[1].innerText.split(" ");


            var verifica1 = cor_esp[26].substring(0, 1);//obtine la direcion del a cordenada
            var verifica2 = cor_esp[29].substring(0, 1);//obtine la direcion del a cordenada
            console.log('=============' + verifica1 + '-' + verifica2);

            //Datos que no tinen province
            if ((verifica1 === 'N' || verifica1 === 'S') && (verifica2 === 'E' || verifica2 === 'W')) {
                d.geometry.coordinates = get_cordenadas(aditional_data[0].children[1].innerText);
                d.properties.dateofinscription = get_string(aditional_data[0].children[2].innerText);

                //url
                d.properties.url = aditional_data[0].lastElementChild.innerText.replace(/\s\s/g, '');
                ;


                //datos que tienen province
            } else {
                d.properties.province = get_string(aditional_data[0].children[1].innerText);
                d.geometry.coordinates = get_cordenadas(aditional_data[0].children[2].innerText);
                d.properties.dateofinscription = get_string(aditional_data[0].children[3].innerText);

                d.properties.url = get_string(aditional_data[0].lastElementChild.innerText);

            }
            geojson.features.push(d);

        }
    });
}




window.setTimeout(function() {
    console.log(geojson)
    $('#loading').removeClass('loading');
}, 8000);


function get_cordenadas(cordenadas) {

    var cor = cordenadas.split(" ");
    //longitud
    var days_lon = parseInt(cor[29].substring(1));
    var minutes_lon = parseInt(cor[30]);
    var seconds_lon = parseInt(cor[31]);
    var direction_lon = cor[29].substring(0, 1);
    //console.log(cor[29]);
    var lon = get_lat_lon(days_lon, minutes_lon, seconds_lon, direction_lon);
    //latitud
    var days_lat = parseInt(cor[26].substring(1));
    var minutes_lat = parseInt(cor[27]);
    var seconds_lat = parseInt(cor[28]);
    var direction_lat = cor[26].substring(0, 1);
    //console.log(cor[26]);
    var lat = get_lat_lon(days_lat, minutes_lat, seconds_lat, direction_lat);

    return [lon, lat];
}
;

function get_lat_lon(days, minutes, seconds, direction) {
    direction.toUpperCase();
    var dd = days + minutes / 60 + seconds / (60 * 60);
    if (direction == "S" || direction == "W")
    {
        dd = dd * -1;
    }
    return dd;
}
;

function get_string(s) {
    return s.replace(/\s\s/g, '').replace(/\n/g, '');
}
;




