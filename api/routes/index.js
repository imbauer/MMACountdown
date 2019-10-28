var express = require('express');
var mongodb = require('../db');
var router = express.Router();
var request = require('request');
var fightersWiki = require("../ExternalAPICalls/FightersWiki");

// index page
router.get('/', function(req, res) {
    mongodb.renderEvents(res);
    // mongodb.renderPastEvents(res);
});

router.get('/upcoming', function(req, res) {
    mongodb.renderEvents(res);
});

router.get('/past', function(req, res) {
    mongodb.renderPastEvents(res);
});

router.get('/sampleData', function(req, res) {
    mongodb.addSampleData();
});



module.exports = router;
