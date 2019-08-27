
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

var eventSchema = new mongoose.Schema({
    name: String,
    title: String,
    nextEvent: String,
    location: {
        name: String,
        city: String,
        provState: String,
        country: String
    },
    when: {
        timeZone: String,
        year: String,
        month: String,
        monthString: String,
        day: String,
        weekDay: String,
        hour: String,
        minute: String,
        AMPM: String
    },
    fightCard: Array

});

var Events = mongoose.model('events', eventSchema);

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

module.exports = {

    connectDB: function() {
        mongoose.connect(url, options).then( function() {
          console.log('MongoDB is connected');
        })
          .catch( function(err) {
          console.log(err);
        });
        //var connectWithRetry = function() {
        //  return mongoose.connect(url, function(err) {
        //    if (err) {
        //      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        //      setTimeout(connectWithRetry, 5000);
        //    }
        //  });
        //};
        //connectWithRetry();
    },

    addData: function(event) {

//        var thisEvent = new Events ({
//            name: event.name,
//            title: event.title,
//            nextEvent: event.nextEvent,
//            location: {
//                name: event.location.name,
//                city: event.location.city,
//                provState: event.location.provState,
//                country: event.location.country
//            },
//            when: {
//                timeZone: event.when.timeZone,
//                year: event.when.year,
//                month: event.when.month,
//                monthString: event.when.monthString,
//                day: event.when.day,
//                weekDay: event.when.weekDay,
//                hour: event.when.hour,
//                minute: event.when.minute,
//                AMPM: event.when.AMPM
//            },
//            fightCard: event.fightCard
//        });
        var thisEvent = new Events (event);
        thisEvent.save(function (err) {if (err) console.log ('Error on save!')});

    },

    addSampleData: function() {
        var ufc241 = new Events ({
            name: 'UFC 241',
            title: 'CORMIER VS MIOCIC II',
            when: {
                timeZone: 'EST',
                year: '2019',
                month: 'August',
                day: '17',
                weekDay: 'Sat',
                hour: '10',
                minute: '00',
                AMPM: 'PM'
            },
            location: {
                name: 'Honda Center',
                city: 'Anaheim',
                provState: 'California',
                country: 'United States'
            }
        });
        var ufc242 = new Events ({
            name: 'UFC 242',
            title: 'NURMAGOMEDOV VS POIRIER',
            when: {
                timeZone: 'EST',
                year: '2019',
                month: 'September',
                day: '07',
                weekDay: 'Sat',
                hour: '08',
                minute: '00',
                AMPM: 'PM'
            },
            location: {
                name: 'du Arena',
                city: 'Abu Dhabi',
                provState: 'Abu Dhabi',
                country: 'United Arab Emirates'
            }
        });
        var bellator225 = new Events ({
            name: 'Bellator 225',
            title: 'MITRIONE VS KHARITONOV II',
            when: {
                timeZone: 'EST',
                year: '2019',
                month: 'August',
                day: '24',
                weekDay: 'Sat',
                hour: '08',
                minute: '00',
                AMPM: 'PM'
            },
            location: {
                name: 'Webster Bank Arena',
                city: 'Bridgeport',
                provState: 'Connecticut',
                country: 'United States'
            }
        });
        var bellator226 = new Events ({
            name: 'Bellator 225',
            title: 'BADER VS KONGO',
            when: {
                timeZone: 'EST',
                year: '2019',
                month: 'September',
                day: '07',
                weekDay: 'Sat',
                hour: '08',
                minute: '00',
                AMPM: 'PM'
            },
            location: {
                name: 'SAP Center',
                city: 'Bridgeport',
                provState: 'Connecticut',
                country: 'United States'
            }
        });
        var pfl6 = new Events ({
            name: 'PFL 6',
            title: 'TILLER VS GOLTSOV',
            when: {
                timeZone: 'EST',
                year: '2019',
                month: 'August',
                day: '08',
                weekDay: 'Thu',
                hour: '08',
                minute: '00',
                AMPM: 'PM'
            },
            location: {
                name: 'Ocean Resort Casino',
                city: 'Atlantic City',
                provState: 'New Jersey',
                country: 'United States'
            }
        });
        var pfl7 = new Events ({
            name: 'PFL 7',
            title: 'TBA VS TBA',
            when: {
                timeZone: 'EST',
                year: '2019',
                month: 'October',
                day: '11',
                weekDay: 'Fri',
                hour: '08',
                minute: '00',
                AMPM: 'PM'
            },
            location: {
                name: 'Mandalay Bay Events Center',
                city: 'Las Vegas',
                provState: 'Nevada',
                country: 'United States'
            }
        });
        // Saving it to the database.
        pfl7.save(function (err) {if (err) console.log ('Error on save!')});
        ufc242.save(function (err) {if (err) console.log ('Error on save!')});
        bellator226.save(function (err) {if (err) console.log ('Error on save!')});
        bellator225.save(function (err) {if (err) console.log ('Error on save!')});
        ufc241.save(function (err) {if (err) console.log ('Error on save!')});
        pfl6.save(function (err) {if (err) console.log ('Error on save!')});
    },

    findData: function() {
        Events.find({}).exec(function(err, result) {
            if (!err) {
                console.log('=============================================');
                console.log(result);
            } else {
                // error handling
            };
        });
    },

    getResults: function(res) {
        Events.find({}).sort( { 'when.year': 1, 'when.month': 1, 'when.day': 1, 'when.hour': 1 } ).exec(function(err, results) {
            if (!err) {
                res.render('mma', {
                    results: results
                });
            } else {
                // error handling
            };
        });
    }

}