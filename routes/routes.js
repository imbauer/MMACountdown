var express = require('express');
var mongodb = require('../db');
var router = express.Router();

// index page
router.get('/', function(req, res) {
    mongodb.getResults(res);
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
