const express = require('express');
const cron = require('node-cron');
const bodyParser = require('body-parser');
var request = require('request');
const app = express();
const port = process.env.PORT || 8080;
const routes = require('./routes/routes');
//const path = __dirname + '/views/';
var mongodb = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/yo', function(request, response) {
    response.send('YO');
});

app.use('/', routes);

mongodb.connectDB();

// start method is called to start the above defined cron job
// task.start();

// cron wont start automatically
// var task = cron.schedule('10 18 * * *', () => {
// 	console.log('Printing this line every day at 1750 Hours London Time.');
// }, {
// 	scheduled: false,
//     timezone: "America/New_York"
// });
function removeUpcomingEvents() {
    return new Promise(resolve => {
      mongodb.clearData();
      console.log("ClearData Section");
      resolve();
    }).catch( function(err) {
        console.log(err);
    });
}

function reAddUpcomingUFCEvents() {
    return new Promise(resolve => {
        var url = 'http://192.168.99.100/ufc/event/UFC%20239';
        request(url, function (err, response, body) {
            if(err){
                console.log(err + ' ERR: Stopped at ---> ' + url);
            } else {
                console.log('Called UFC successfully');
            }
        });
        console.log("Add UFC Data Section");
        resolve();
    }).catch( function(err) {
        console.log(err);
    });
}

function reAddUpcomingBellatorEvents() {
    return new Promise(resolve => {
        var url = 'http://192.168.99.100/bellator/event/Bellator_MMA_in_2019';
        request(url, function (err, response, body) {
            if(err){
                console.log(err + ' ERR: Stopped at ---> ' + url);
            } else {
                console.log('Called Bellator successfully');
            }
        });
        console.log("Add Bellator Data Section");
        resolve();
    }).catch( function(err) {
        console.log(err);
    });
}

// cron.schedule('0 * * * * *', () => {
//     removeUpcomingEvents().then(() => reAddUpcomingUFCEvents()).then(() => reAddUpcomingBellatorEvents());
//     console.log('==============================================================');
//     console.log('Runs at the start of each minute');
//     console.log('==============================================================');
// });

app.listen(port, function(){
    console.log( `Example app listening on port ${port}!` );
});
