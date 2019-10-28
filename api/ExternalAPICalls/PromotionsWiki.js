var express = require('express');
var router = express.Router();
var request = require('request');
var processPromotions = require('../processing/ProcessPromotions');


router.get('/ufc/event/:eventName', function(req, res, next) {

    var currentEvent = req.params.eventName.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');
    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&utf8=true&titles=" + encodeURIComponent(currentEvent).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
    // console.log(url);
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

router.get('/bellator/event/:eventName', function(req, res, next) {

    var currentEvent = req.params.eventName.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');
    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&utf8=true&titles=" + encodeURIComponent(currentEvent).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
    // console.log(url);
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

module.exports = router;
