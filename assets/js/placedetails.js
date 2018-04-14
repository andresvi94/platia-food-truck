var https = require('https');
var credentials = require('./../../credentials.js');

module.exports = function(cb){
    var options = {
        hostname: 'maps.googleapis.com',
        path: '/maps/api/place/details/json?placeid=' +
              encodeURIComponent(credentials.PLATIA_PLACE_ID) +
            '&key=' + encodeURIComponent(credentials.GOOGLE_PLACES_API_KEY),
    };

    https.request(options, function(res){
        var data = "";
        res.on('data', function(chunk){
            data += chunk;
        });
        res.on('end', function(){
            data = JSON.parse(data);
            // if(data.status == "OK"){
            if(data.status.length){
                cb(null, data);
            } else {
                cb("No results found.", null);
            }
        });
    }).end();
};
