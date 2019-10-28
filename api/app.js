var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cron = require('node-cron');
var request = require('request');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var promotions = require('./routes/Promotions');
var fighters = require('./routes/Fighters');
var fightersWiki = require("./ExternalAPICalls/FightersWiki");
var promotionsWiki = require("./ExternalAPICalls/PromotionsWiki");
var mongodb = require('./db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongodb.connectDB();

app.use('/', indexRouter);
app.use("/promotions", promotions);
app.use("/fighters", fighters);
app.use("/fightersWiki", fightersWiki);
app.use("/promotionsWiki", promotionsWiki);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
        var url = 'http://192.168.99.100:9000/promotions/ufc/event/UFC%20240';
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
        var url = 'http://192.168.99.100:9000/promotions/bellator/event/Bellator_MMA_in_2019';
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

cron.schedule('1 * * * *', () => {
    removeUpcomingEvents().then(() => reAddUpcomingUFCEvents()).then(() => reAddUpcomingBellatorEvents());
    console.log('==============================================================');
    console.log('Runs at the number in the hour');
    console.log('==============================================================');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
