var express = require('express');
var app = express();
var processPromotions = require('./scripts/process_promotions');

app.set('port', (process.env.PORT || 8081));
app.use(express.static(__dirname + '/public'));

var request = require('request');


app.get('/', function(request, response) {
    response.send('Hello World!')
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});


app.get('/v1/ufc/event/:eventName', function(req, res, next) {

    var currentEvent = req.params.eventName.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');

    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&utf8=true&titles=" + encodeURIComponent(currentEvent).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
    console.log(url);
    request(url, function (err, response, body) {
        if(err){
            console.log(err + ' ERR: Stopped at ---> ' + url);
        } else {
            var event = processPromotions.processUFC(body, currentEvent);
//            console.log(event);
//            console.log(event.fightCard);
            res.send(event);
            return event;
        }
    });

});


function processPFL() {
     var pet = 'dog';
     console.log(pet);
}