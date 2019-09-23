var express = require('express');
var mongodb = require('../db');
var router = express.Router();
var request = require('request');

// index page
router.get('/', function(req, res) {
    mongodb.renderEvents(res);
    // mongodb.renderPastEvents(res);
});

router.get('/hey', function(req, res) {
    mongodb.renderPastEvents(res);
});


router.get('/clear/old/events', function(req, res) {
    mongodb.clearData();
});

router.get('/ufc/event/:eventName', function(req, res) {
    repeatProcess(req.params.eventName);
});


//SETUP GET FIGHTER DATA DONT REPEAT
router.get('/fighter/data/:fighterName', function(req, res) {
    var fighter = req.params.fighterName.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');
    var URI = encodeURIComponent(fighter).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
    var url = 'http://192.168.99.100:8081/v1/fighter/data/' + URI;
    request(url, function (err, response, body) {
        if(err){
            console.log(err + ' ERR: Stopped at ---> ' + url);
        } else {
            var data = JSON.parse(body);
            mongodb.addFighter(data);
        }
    });
});

function repeatProcess(event) {
    event = event.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');
    var URI = encodeURIComponent(event).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
    var url = 'http://192.168.99.100:8081/v1/ufc/event/' + URI;
    request(url, function (err, response, body) {
        if(err){
            console.log(err + ' ERR: Stopped at ---> ' + url);
        } else {
            var data = JSON.parse(body);
//            console.log(url);
//            console.log(data);
//            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                mongodb.addEvent(data[i]);
            }
            if (data[0].nextEvent !== null || data[0].nextEvent !== '' || data[0].nextEvent !== undefined) {
                console.log(data[0].name + ' WORKED');
                if (data[0].nextEvent.includes('following')) {
                    console.log('Exited without issue');
                    return;
                }
                repeatProcess(data[0].nextEvent);
            }
        }
    });
}

router.get('/bellator/event/:eventName', function(req, res) {
    var event = req.params.eventName.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');
    var URI = encodeURIComponent(event).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
    var url = 'http://192.168.99.100:8081/v1/bellator/event/' + URI;
    request(url, function (err, response, body) {
        if(err){
            console.log(err + ' ERR: Stopped at ---> ' + url);
        } else {
            var data = JSON.parse(body);
            console.log('============================================');
            console.log('Data length');
            console.log(data.length);
            console.log('============================================');
            for (var i = 0; i < data.length; i++) {
//                console.log(data[i]);
                mongodb.addEvent(data[i]);
            }
        }
    });
});

router.post('/', function (req, res) {
    res.send( 'Got a POST request' )
});

router.put('/user', function (req, res) {
    res.send( 'Got a PUT request at /user' )
});

router.delete('/user', function (req, res) {
    res.send( 'Got a DELETE request at /user' )
});

router.get('/ufc', function(req, res){
//    res.send( 'Hello World!' );
//    res.sendFile( __dirname + "/public/" + "index1.html" );
    res.render('ufc');
//    res.sendFile( path + "ufc.html" );
});

router.post('/ufc', function(req, res) {
    console.log( `Full name is: ${req.body.fname} ${req.body.lname}` );
});

module.exports = router;
