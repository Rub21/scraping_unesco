var geojson = {
    "type": "FeatureCollection",
    "features": []
};

for (i = 1; i < 2000; i++) {

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
                "dateofinscription": '',
                "criteria": '',
                "property": '',
                "url": ''
            }
        };

        var html = res.responseText;
        // console.log($("div .content", $(html)));
        var data = $("div .content", $(html));
        //console.log(data);
        var name = $('h1', data)[0].innerText;
        if (typeof(name) !== 'undefined') {

            d.properties.name = name;
            var aditional_data = $('div .relatedContent', data);
            //console.log(aditional_data);
            d.properties.country = get_string(aditional_data[0].children[0].innerText);

           /* $('.content').append(aditional_data);
            $('.relatedContent').addClass('well');*/

            //comprueba los datos adicinales para asignar cordenadas 
            //para province
            var cor_e = aditional_data[0].children[1].innerText.split(" ");
            var v1 = cor_e[26].substring(0, 1);//obtine la direcion del a cordenada
            var v2 = cor_e[29].substring(0, 1);//obtine la direcion del a cordenada
            console.log('*************' + v1 + '-' + v2);
            if ((v1 === 'N' || v1 === 'S') && (v2 === 'E' || v2 === 'W')) {
                d.properties.province = "";
            }
            else {
                d.properties.province = get_string(aditional_data[0].children[1].innerText);
            }


            //obtiene todo los datos

            for (i = 1; i < aditional_data[0].children.length; i++) {
                var atributes = aditional_data[0].children[i].innerText;
                if (atributes.search("Date of Inscription") > 0) {
                    d.properties.dateofinscription = get_string(atributes).replace('Date of Inscription:', '').replace(/\s/g, '');

                } else if (atributes.search("Criteria") > 0) {
                    d.properties.criteria = get_string(atributes).replace('Criteria:', '').replace(/\s/g, '');

                } else if (atributes.search("Property") > 0) {
                    d.properties.property = get_string(atributes).replace('Property :', '');

                }

                ///cordinates:

                var cor_esp = atributes.split(" ");

                var verifica1 = cor_esp[26].substring(0, 1);//obtine la direcion del a cordenada
                var verifica2 = cor_esp[29].substring(0, 1);//obtine la direcion del a cordenada
                console.log('=============' + verifica1 + '-' + verifica2);

                if ((verifica1 === 'N' || verifica1 === 'S') && (verifica2 === 'E' || verifica2 === 'W')) {
                    d.geometry.coordinates = get_cordenadas(atributes);
                }

                d.properties.url = 'http://whc.unesco.org/en/list/' + get_string(aditional_data[0].lastElementChild.innerText).replace('Ref:', '').replace('bis', '').replace('quater', '').replace('rev', '').replace(/\s/g, '');

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



$(document).ready(function() {


    $('#datal').click(function() {

        $('#btn-full-with').trigger('click');
        createfile(geojson);

    });

});

function createfile(d) {

    var Base64 = {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        // public method for encoding
        encode: function(input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = Base64._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },
        // public method for decoding
        decode: function(input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64._utf8_decode(output);

            return output;

        },
        // private method for UTF-8 encoding
        _utf8_encode: function(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },
        // private method for UTF-8 decoding
        _utf8_decode: function(utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }

    }

    var axx = document.getElementById("unesco");
    axx.download = 'unesco.json';
    axx.href = 'data:text/json;base64,' + Base64.encode(JSON.stringify(d));
}

