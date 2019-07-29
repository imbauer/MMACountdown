const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const path = __dirname + '/views/';

app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, options).then( function() {
  console.log('MongoDB is connected');
})
  .catch( function(err) {
  console.log(err);
});


app.get('/', function(req, res){
//    res.send('Hello World!');
//    res.sendFile( __dirname + "/public/" + "index1.html" );
    res.sendFile( path + "mma.html" );
});

app.post('/', function (req, res) {
  res.send( 'Got a POST request' )
});

app.put('/user', function (req, res) {
  res.send( 'Got a PUT request at /user' )
});

app.delete('/user', function (req, res) {
  res.send( 'Got a DELETE request at /user' )
});



app.get('/ufc', function(req, res){
//    res.send( 'Hello World!' );
//    res.sendFile( __dirname + "/public/" + "index1.html" );
    res.sendFile( path + "ufc.html" );
});

app.post('/ufc', function(req, res) {
    console.log( `Full name is: ${req.body.fname} ${req.body.lname}` );
});


app.listen(port, function(){
    console.log( `Example app listening on port ${port}!` );
});