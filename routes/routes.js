var express = require('express');
var mongodb = require('../db');
var router = express.Router();
var request = require('request');

// index page
router.get('/', function(req, res) {
    mongodb.getResults(res);
});

router.get('/hey', function(req, res) {
    res.send('Hey');
});

router.get('/ufc/event/:eventName', function(req, res) {
    var currentEvent = req.params.eventName.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');
    var url = 'http://192.168.99.103:8081/v1/ufc/event/' + currentEvent;
    request(url, function (err, response, body) {
        if(err){
//            var error = "cannot connect to the server(1)";
            res.send(err);
            console.log(err);
        } else {
            var data = JSON.parse(body);
            mongodb.addData(data);
            res.send(body);
        }
    });
});
//app.get('/', function(req, res){
////    res.send('Hello World!');
////    res.sendFile( __dirname + "/public/" + "index1.html" );
//    res.sendFile( path + "mma.html" );
//});

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
