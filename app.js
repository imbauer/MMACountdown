var express = require('express');
var app = express();
var processPromotions = require('./scripts/process_promotions');
var processFighters = require('./scripts/process_fighters');

app.set('port', (process.env.PORT || 8081));
app.use(express.static(__dirname + '/public'));

var request = require('request');


app.get('/', function(request, response) {
    response.send('Hello World!');
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
    // var fighterName = 'Jim Miller (fighter)';
    // var url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&utf8=true&titles="
    // + encodeURIComponent(fighterName).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
    //
    // request(url, function (err, response, body) {
    //     if(err){
    //         console.log(err + ' ERR: Stopped at ---> ' + url);
    //     } else {
    //         var fighter = processFighters.processFighter(body, fighterName);
    //         res.send(fighter);
    //         return fighter;
    //     }
    // });
});

app.get('/v1/fighter/data/:fighterName', function(req, res, next) {

    var fighterName = req.params.fighterName;
    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&utf8=true&titles="
    + encodeURIComponent(fighterName).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');

    request(url, function (err, response, body) {
        if(err){
            console.log(err + ' ERR: Stopped at ---> ' + url);
        } else {
            var fighter = processFighters.processFighter(body, fighterName);
            res.send(fighter);
            return fighter;
        }
    });

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
            res.send(event);
            return event;
        }
    });

});


app.get('/v1/bellator/event/:eventName', function(req, res, next) {

    var currentEvent = req.params.eventName.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');
    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&utf8=true&titles=" + encodeURIComponent(currentEvent).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
    console.log(url);
    request(url, function (err, response, body) {
        if(err){
            console.log(err + ' ERR: Stopped at ---> ' + url);
        } else {
            var events = processPromotions.processBellator(body, currentEvent);
            res.send(events);
            return events;
        }
    });

});

function processPFL() {
     var pet = 'dog';
     console.log(pet);
}
