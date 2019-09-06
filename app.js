const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const routes = require('./routes/routes');
//const path = __dirname + '/views/';
var mongodb = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/yo', function(request, response) {
    response.send('YO')
});

app.use('/', routes);


mongodb.connectDB();

//mongodb.addSampleData();

//mongodb.findData();



app.listen(port, function(){
    console.log( `Example app listening on port ${port}!` );
});