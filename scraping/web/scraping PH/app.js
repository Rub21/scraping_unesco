var geojson = {
    "type": "FeatureCollection",
    "features": []
};



var all = '';
for (i = 1; i < 3; i++) {

    data = '';
    $('#widgetscript').attr('urlwidget', 'http://whc.unesco.org/en/list/' + i);
//get print data  

    var urlwidget = $('#widgetscript').attr('urlwidget');
    $.get(urlwidget, function(res) {
        //parametro para eliminar string
        var first = res.responseText.search('<div class="relatedContent alternate">');
        var second = res.responseText.search('<div class="box gmap">');

        data = res.responseText.substring(first, second);
        data = data.replace('<a href="/en/statesparties/', '<a href="#');
        data = data.replace('style="vertical-align:middle; border:1px solid #666666"', '');
        data = data.replace('/uploads/states/small/', '');

        //console.log($(data)[1].previousSibling.children[1].innerText);
        //console.log($(data));

        ///declaracion de JSON

        var d = {
            "geometry": {
                "type": "Point",
                "coordinates": [0, 0]
            },
            "type": "Feature",
            "properties": {
                "country": '',
                "name": '',
                "property": '',
                "criteria": '',
                "dateofinscription": ''
            }
        };

        console.log('CONTADOR DE CHILDRENS');
        console.log($(data)[1].previousSibling.childElementCount);

        if (data.length > 0) {
            all += data;
            if ($(data)[1].previousSibling.childElementCount === 7) {

                d.properties.country = $(data)[1].previousSibling.children[0].innerText;
                d.properties.country = d.properties.country.replace(/\n/g, '');

                d.properties.name = $(data)[1].previousSibling.children[1].innerText;
                d.properties.name = d.properties.name.replace(/\n/g, '');

                d.properties.dateofinscription = $(data)[1].previousSibling.children[3].innerText;
                d.properties.dateofinscription = d.properties.dateofinscription.replace(/\n/g, '').replace('Date of Inscription:', '');

                d.properties.criteria = $(data)[1].previousSibling.children[4].innerText;
                d.properties.criteria = d.properties.criteria.replace(/\n/g, '').replace('Criteria:', '');

                d.properties.property = $(data)[1].previousSibling.children[5].innerText;
                d.properties.property = d.properties.property.replace(/\n/g, '').replace('Property :', '');


            } else if ($(data)[1].previousSibling.childElementCount === 8) {

                //console.log($(data)[1]);
                d.properties.country = $(data)[1].previousSibling.children[0].innerText;
                d.properties.country = d.properties.country.replace(/\n/g, '');

                d.properties.name = $(data)[1].previousSibling.children[1].innerText;
                d.properties.name = d.properties.name.replace(/\n/g, '');

                d.properties.dateofinscription = $(data)[1].previousSibling.children[3].innerText;
                d.properties.dateofinscription = d.properties.dateofinscription.replace(/\n/g, '').replace('Date of Inscription:', '');


                d.properties.extencion = $(data)[1].previousSibling.children[4].innerText;
                d.properties.extencion = d.properties.extencion.replace(/\n/g, '').replace('Extension:', '');


                d.properties.criteria = $(data)[1].previousSibling.children[5].innerText;
                d.properties.criteria = d.properties.criteria.replace(/\n/g, '').replace('Criteria:', '');

                d.properties.property = $(data)[1].previousSibling.children[6].innerText;
                d.properties.property = d.properties.property.replace(/\n/g, '').replace('Property :', '');




            }


            ////////Cordinates
            var cordinates = $(data)[1].previousSibling.children[2].innerText;
            var cor = cordinates.split(" ");
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
            //console.log('lat: ' + lat + '+ lon:' + lon);
            d.geometry.coordinates[0] = lon;
            d.geometry.coordinates[1] = lat;

            geojson.features.push(d);



        }

    }
    );
}
;
window.setTimeout(function() {
    $('.content').append(all);
    $('.relatedContent').addClass('well');
    console.log(geojson)
}, 3000);


function get_lat_lon(days, minutes, seconds, direction) {
    direction.toUpperCase();
    var dd = days + minutes / 60 + seconds / (60 * 60);
    //alert(dd);
    if (direction == "S" || direction == "W")
    {
        dd = dd * -1;
    } // Don't do anything for N or E return dd; }

    return dd;
}
;
















$(document).ready(function() {

    $('#datal').click(function() {

        console.log($(".relatedContent > div").size());
        console.log($(".relatedContent").size());

        //console.log($(".relatedContent").get(0));


        for (i = 1; i <= $(".relatedContent > div").size() - 1; i++) {


            if (i % 7 == 0) {
                console.log('----------------------------------------Nombres de Paises----')

                var country = $(".relatedContent > div").get(i - 7);
                var name = $(".relatedContent > div").get(i - 6);
                var dateofinscription = $(".relatedContent > div").get(i - 5);
                var criteria = $(".relatedContent > div").get(i - 4);
                var property = $(".relatedContent > div").get(i - 3);
                console.log(country);
                console.log(name);
                console.log(dateofinscription);
                console.log(criteria);
                console.log(property);

            }





        }














        /* for (i = 1; i <= $(".relatedContent>div").size()-1; i++) {
         
         console.log(i - 7 + 1);
         if (i % 7 == 0) {
         
         d.properties.country = $(".relatedContent > div").get(i - 7 + 1);
         d.properties.country = d.properties.country.innerText.replace(/\n/g, '');
         
         d.properties.name = $(".relatedContent > div").get(i - 7 + 2);
         d.properties.name = d.properties.name.innerText.replace(/\n/g, '');
         
         d.properties.dateofinscription = $(".relatedContent > div").get(i - 7 + 4);
         d.properties.dateofinscription = d.properties.dateofinscription.innerText.replace(/\n/g, '').replace('Date of Inscription:', '');
         
         d.properties.criteria = $(".relatedContent > div").get(i - 7 + 5);
         d.properties.criteria = d.properties.criteria.innerText.replace(/\n/g, '').replace('Criteria:', '');
         
         d.properties.property = $(".relatedContent > div").get(i - 7 + 6);
         d.properties.property = d.properties.property.innerText.replace(/\n/g, '').replace('Property :', '');
         
         geojson.features.push(d);
         }
         
         
         }*/







        console.log(geojson);



    });



});













