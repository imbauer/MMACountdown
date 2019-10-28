var express = require('express');
var router = express.Router();
var request = require('request');
var processFighters = require('../processing/ProcessFighters');

router.get('/fighter/data/:fighterName', function(req, res, next) {

    var fighterName = req.params.fighterName;
    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&utf8=true&titles="
    + encodeURIComponent(fighterName).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');

    request(url, function (err, response, body) {
        if(err){
            console.log(err + ' ERR: Stopped at ---> ' + url);
        } else {
            fighterName = fighterName.replace(/\s\(.*/g, '');
            var fighter = processFighters.processFighter(body, fighterName);
            res.send(fighter);
            return fighter;
        }
    });

});

module.exports = router;
