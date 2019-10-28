var express = require('express');
var mongodb = require('../db');
var router = express.Router();
var request = require('request');

router.get('/clear/old/events', function(req, res) {
    mongodb.clearData();
});

router.get('/ufc/event/:eventName', function(req, res) {
    repeatProcess(req.params.eventName);
});

function repeatProcess(event) {
    event = event.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');
    var URI = encodeURIComponent(event).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
    var url = 'http://192.168.99.100:9000/promotionsWiki/ufc/event/' + URI;
    request(url, function (err, response, body) {
        if(err){
            console.log(err + ' ERR: Stopped at ---> ' + url);
        } else {
            try {
                var data = JSON.parse(body);
                console.log('================================= Returned Event and Type =================================');
                console.log(data);
                console.log(typeof data);
                console.log('-------------------------------------------------------------------------------------------');
                for (var i = 0; i < data.length; i++) {
                    mongodb.addEvent(data[i]);
                }
                if (data[0].nextEvent !== null || data[0].nextEvent !== '' || data[0].nextEvent !== undefined) {
                    // console.log(data[0].name + ' WORKED');
                    if (data[0].nextEvent.includes('following')) {
                        console.log('Exited without issue');
                        return;
                    }
                    repeatProcess(data[0].nextEvent);
                }
            }
            catch(error) {
                repeatProcess(body);
            }

        }
    });
}

router.get('/bellator/event/:eventName', function(req, res) {
    var event = req.params.eventName.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');
    var URI = encodeURIComponent(event).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
    var url = 'http://192.168.99.100:9000/promotionsWiki/bellator/event/' + URI;
    request(url, function (err, response, body) {
        if(err){
            console.log(err + ' ERR: Stopped at ---> ' + url);
        } else {
            var data = JSON.parse(body);
            // console.log('============================================');
            // console.log('Data length');
            // console.log(data.length);
            // console.log('============================================');
            for (var i = 0; i < data.length; i++) {
                mongodb.addEvent(data[i]);
            }
        }
    });
});

router.get('/exact/time/:eventName/:eventTitle/:eventEvent/:eventHour/:eventMinute', function(req, res) {
    mongodb.addEventTime(res, req.params.eventName, req.params.eventTitle, req.params.eventEvent, req.params.eventHour, req.params.eventMinute);
});

// index page
router.get('/', function(req, res) {
    mongodb.renderEvents(res);
    // mongodb.renderPastEvents(res);
});

router.get('/upcoming/ufc', function(req, res) {
    mongodb.renderUpcomingUFCEvents(res);
});

router.get('/upcoming/bellator', function(req, res) {
    mongodb.renderUpcomingBellatorEvents(res);
});

router.get('/upcoming', function(req, res) {
    mongodb.renderUpcomingEvents(res);
});

router.get('/past/ufc', function(req, res) {
    mongodb.renderPastUFCEvents(res);
});

router.get('/past/bellator', function(req, res) {
    mongodb.renderPastBellatorEvents(res);
});

router.get('/past', function(req, res) {
    mongodb.renderPastEvents(res);
});

router.get('/sampleData', function(req, res) {
    mongodb.addSampleData();
});

module.exports = router;
