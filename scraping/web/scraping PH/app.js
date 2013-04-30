
var all = '';
for (i = 1; i < 10; i++) {
    data = '';
    $('#widgetscript').attr('urlwidget', 'http://whc.unesco.org/en/list/' + i);
//get print data  

    var urlwidget = $('#widgetscript').attr('urlwidget');


    $.get(urlwidget, function(res) {
        var first = res.responseText.search('<div class="relatedContent alternate">');
        var second = res.responseText.search('<div class="box gmap">');

        data = res.responseText.substring(first, second);
        data = data.replace('<a href="/en/statesparties/', '<a href="#');
        data = data.replace('style="vertical-align:middle; border:1px solid #666666"', '');
        data = data.replace('/uploads/states/small/', '');
        //console.log(data);
        if (data.length > 0) {
            all += data;
        }
    });
}
;

window.setTimeout(function() {
    $('.content').append(all);
    $('.relatedContent').addClass('well');
}, 3000);



$(document).ready(function() {

    var geojson = {
        "type": "FeatureCollection",
        "features": []
    };

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













