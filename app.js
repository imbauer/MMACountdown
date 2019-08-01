const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const path = __dirname + '/views/';

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

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



var eventSchema = new mongoose.Schema({
  name: String,
  title: String,
  when: {
    timeZone: String,
    year: String,
    month: String,
    day: String,
    weekDay: String,
    hour: String,
    minute: String,
    AMPM: String
  }
});

var Event = mongoose.model('events', eventSchema);
// Creating one event.
var ufc241 = new Event ({
  name: 'UFC 241',
  title: 'CORMIER VS MIOCIC II',
  when: {
    timeZone: 'EST',
    year: '2019',
    month: 'August',
    day: '17',
    weekDay: 'Saturday',
    hour: '10',
    minute: '00',
    AMPM: 'PM'
  }
});

var ufc242 = new Event ({
  name: 'UFC 242',
  title: 'NURMAGOMEDOV VS POIRIER',
  when: {
    timeZone: 'EST',
    year: '2019',
    month: 'September',
    day: '07',
    weekDay: 'Saturday',
    hour: '08',
    minute: '00',
    AMPM: 'PM'
  }
});
// Saving it to the database.
ufc241.save(function (err) {if (err) console.log ('Error on save!')});
ufc242.save(function (err) {if (err) console.log ('Error on save!')});



Event.find({}).exec(function(err, result) {
  if (!err) {
    console.log('=============================================');
    console.log(result);
  } else {
    // error handling
  };
});

// index page
app.get('/', function(req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    console.log('HELLO');

    Event.find({}).exec(function(err, results) {
      if (!err) {
        res.render('mma', {
            results: results
        });
      } else {
        // error handling
      };
    });
//    res.render('mma', {
//        drinks: drinks
//    });
});

//app.get('/', function(req, res){
////    res.send('Hello World!');
////    res.sendFile( __dirname + "/public/" + "index1.html" );
//    res.sendFile( path + "mma.html" );
//});

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