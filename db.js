
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

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
    "_id": false,
    name: String,
    title: String,
    event: String,
    otherName: String,
    promotion: String,
    nextEvent: String,
    location: {
        name: String,
        city: String,
        provState: String,
        country: String,
        co: String
    },
    when: {
        timeZone: String,
        year: Number,
        month: Number,
        monthString: String,
        day: Number,
        weekDay: String,
        hour: Number,
        minute: Number,
        AMPM: String
    },
    fightCard: Array

});

var dict = {
  'Afghanistan': 'af', 'Aland Islands': 'ax', 'Albania': 'al', 'Algeria': 'dz', 'American Samoa': 'as', 'Andorra': 'ad', 'Angola': 'ao', 'Anguilla': 'ai',
  'Antigua and Barbuda': 'ag', 'Argentina': 'ar', 'Armenia': 'am', 'Aruba': 'aw', 'Australia': 'au', 'Austria': 'at', 'Azerbaijan': 'az', 'Bahamas': 'bs',
  'Bahrain': 'bh', 'Bangladesh': 'bd', 'Barbados': 'bb', 'Belarus': 'by', 'Belgium': 'be', 'Belize': 'bz', 'Benin': 'bj', 'Bermuda': 'bm',
  'Bhutan': 'bt', 'Bolivia ': 'bo', 'Bosnia and Herzegovina': 'ba', 'Botswana': 'bw', 'Brazil': 'br', 'Bulgaria': 'bg', 'Burkina Faso': 'bf', 'Burundi': 'bi',
  'Cabo Verde': 'cv', 'Cambodia': 'kh', 'Cameroon': 'cm', 'Canada': 'ca', 'Cayman Islands': 'ky', 'Central African Republic': 'cf', 'Chad': 'td', 'Chile': 'cl',
  'China': 'cn', 'Christmas Island': 'cx', 'Colombia': 'co', 'Comoros': 'km', 'Cook Islands': 'ck', 'Costa Rica': 'cr', 'Croatia': 'hr', 'Cuba': 'cu',
  'Curaçao': 'cw', 'Cyprus': 'cy', 'Czech Republic': 'cz', 'Côte d\'Ivoire': 'ci', 'Democratic Republic of the Congo': 'cd', 'Denmark': 'dk', 'Djibouti': 'dj',
  'Dominica': 'dm', 'Dominican Republic': 'do', 'Ecuador': 'ec', 'Egypt': 'eg', 'El Salvador': 'sv', 'England': 'gb-eng', 'Equatorial Guinea': 'gq', 'Eritrea': 'er',
  'Estonia': 'ee', 'Ethiopia': 'et', 'Falkland Islands': 'fk', 'Faroe Islands': 'fo', 'Fiji': 'fj', 'Finland': 'fi', 'France': 'fr', 'French Guiana': 'gf',
  'French Polynesia':'pf', 'Gabon':'ga', 'Gambia':'gm', 'Georgia':'ge', 'Germany':'de', 'Ghana':'gh', 'Gibraltar':'gi', 'Greece':'gr', 'Greenland':'gl', 'Grenada':'gd',
  'Guadeloupe':'gp', 'Guam':'gu', 'Guatemala':'gt', 'Guernsey':'gg', 'Guinea':'gn', 'Guinea-Bissau':'gw', 'Guyana':'gy', 'Haiti':'ht', 'Honduras':'hn', 'Hong Kong':'hk',
  'Hungary':'hu', 'Iceland':'is', 'India':'in', 'Indonesia':'id', 'Iran':'ir', 'Iraq':'iq', 'Ireland':'ie', 'Israel':'il', 'Italy':'it', 'Jamaica':'jm',
  'Japan':'jp', 'Jordan':'je', 'Kazakhstan':'jo', 'Kenya':'kz', 'Kiribati':'ki', 'Kosovo':'xk', 'Kuwait':'kw', 'Kyrgyzstan':'kg', 'Laos':'la', 'Latvia':'lv',
  'Lebanon':'lb', 'Lesotho':'ls', 'Liberia':'lr', 'Libya':'ly', 'Liechtenstein':'li', 'Lithuania':'lt', 'Luxembourg':'lu', 'Macau':'mo', 'Madagascar':'mg', 'Malawi':'mw',
  'Malaysia':'my', 'Maldives':'mv', 'Mali':'ml', 'Malta':'mt', 'Martinique':'mq', 'Mauritania':'mr', 'Mauritius':'mu', 'Mayotte':'yt', 'Mexico':'mx',
  'Moldova':'md', 'Monaco':'mc', 'Mongolia':'mn', 'Montenegro':'me', 'Montserrat':'ms', 'Morocco':'ma', 'Mozambique':'mz', 'Myanmar':'mm', 'Namibia':'na',
  'Nauru':'nr', 'Nepal':'np', 'Netherlands':'nl', 'New Caledonia':'nc', 'New Zealand':'nz', 'Nicaragua':'ni', 'Niger':'ne', 'Nigeria':'ng', 'Niue':'nu',
  'Norfolk Island':'nf', 'North Korea':'kp', 'North Macedonia':'mk', 'Northern Ireland':'gb-nir', 'Norway':'no', 'Oman':'om', 'Pakistan':'pk', 'Palau':'pw', 'Panama':'pa',
  'Papua New Guinea':'pg', 'Paraguay':'py', 'Peru':'pe', 'Philippines':'ph', 'Poland':'pl', 'Portugal':'pt', 'Puerto Rico':'pr', 'Qatar':'qa', 'Republic of the Congo':'cg',
  'Romania':'ro', 'Russia':'ru', 'Rwanda':'rw', 'Samoa':'ws', 'San Marino':'sm', 'Saudi Arabia':'sa', 'Scotland':'gb-sct', 'Senegal':'sn', 'Serbia':'rs',
  'Singapore':'sg', 'Slovakia':'sk', 'Slovenia':'si', 'Solomon Islands':'sb', 'Somalia':'so', 'South Africa':'za', 'South Korea':'kr', 'South Sudan':'ss', 'Spain':'es',
  'Sri Lanka':'lk', 'Palestine':'ps', 'Sudan':'sd', 'Swaziland':'sz', 'Sweden':'se', 'Switzerland':'ch', 'Syria':'sy', 'Taiwan':'tw', 'Tajikistan':'tj',
  'Tanzania':'tz', 'Thailand':'th', 'Tonga':'to', 'Trinidad and Tobago':'tt', 'Tunisia':'tn', 'Turkey':'tr', 'Turkmenistan':'tm', 'Uganda':'ug', 'Ukraine':'ua',
  'United Arab Emirates':'ae', 'United Kingdom':'gb', 'United States of America':'us', 'United States':'us', 'USA':'us', 'Uruguay':'uy', 'Uzbekistan':'uz',
  'Venezuela':'ve', 'Vietnam':'vn', 'Wales':'gb-wls', 'Western Sahara':'eh', 'Yemen':'ye', 'Zambia':'zm', 'Zimbabwe':'zw'
};

eventSchema.index({name: 1, title: 1}, {unique: true});

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

    clearData: function() {
        var today = new Date();
        var year = today.getFullYear();
        var month;
        if (today.getMonth() + 1 < 10) { month = today.getMonth() + 1;month = '0' + month; }
        else { month = today.getMonth() + 1; }
        var day = today.getDate();
        // var date = year + ' - ' + month + ' - ' + day;
        // console.log(date);
        Events.find({}, function(err, events) {
            // var userMap = {};

            events.forEach(function(event) {
                if (event.when.year > parseInt(year)) {
                    Events.deleteOne({ name:event.name, title: event.title }, function (err) {});
                    console.log('Deleted at year');
                }
                else if (event.when.year === parseInt(year)) {
                    if (event.when.month > parseInt(month)) {
                        Events.deleteOne({ name:event.name, title: event.title }, function (err) {});
                        console.log('Deleted at month');
                    }
                    else if (event.when.month === parseInt(month)) {
                        if (event.when.day > parseInt(day)) {
                            Events.deleteOne({ name:event.name, title: event.title }, function (err) {});
                            console.log('Deleted at day');
                        }
                    }
                }
                // console.log(event);
                // userMap[user._id] = user;
            });

            // res.send(userMap);
        });
    },

    addData: function(event) {

        console.log(event.location.country + ' ---> ' + dict[event.location.country]);
        event.location.co = dict[event.location.country];

        console.log(event);

        var thisEvent = new Events(event);


        function getOldEvent(event) {
            return Events.findOne({name:event.name, title: event.title}) // Notice the return here
            .lean()
            .exec()
            .then((previousEvent) => {
                // console.log('Phase 0');
                // // FIRST CONSOLE.LOG
                // console.log(typeof previousEvent);
                // console.log(previousEvent.name);
                // console.log(previousEvent.location);
                // console.log(previousEvent.fightCard);

//                previousEvent = JSON.parse(previousEvent);

                if (previousEvent.fightCard !== undefined || previousEvent.fightCard !== null || previousEvent.fightCard !== []) {
                    // console.log('Phase 1');
                    for (var i = 0; i < previousEvent.fightCard.length; i++) {
                        // console.log('Phase 2');
                        if (previousEvent.fightCard[i].length === 4 || previousEvent.fightCard[i].length === 5) {
                            // console.log('Phase 3');
                            if (event.fightCard[i].length === 4 || event.fightCard[i].length === 5) {
                                // console.log('Phase 4');
                                // Do nothing
                            }
                            else if (event.fightCard[i].length > 5) {
                                // console.log('Phase 5');
                                if (event.fightCard[i][1] === previousEvent.fightCard[i][1]) {
                                    // console.log('Phase 6');
                                    // Do nothing
                                }
                                else if (event.fightCard[i][3] === previousEvent.fightCard[i][1]) {
                                    // console.log('Phase 7');
                                    event.fightCard[i][2] = 2;
                                    event.fightCard[i][3] = previousEvent.fightCard[i][3];
                                    event.fightCard[i][1] = previousEvent.fightCard[i][1];
                                }
                            }
                        }
                        else if (previousEvent.fightCard[i].length > 3) {
                            // console.log('Phase 8');
                            // Do nothing
                        }
                    }
                }

                Events.findOneAndUpdate(
                    {'name':event.name, 'title':event.title},
                    thisEvent,
                    {upsert:true, new: true},
                    function(err, doc){
                        if (err){console.log(err)}
                    }
                );
        //        console.log('||||||||||||||||||||||||||||||||||||||||');
        //        console.log(previousEvent);
        //        console.log('||||||||||||||||||||||||||||||||||||||||');
                return previousEvent;
            })
            .catch((err) => {
//                console.log(err);
                // console.log('Running it fresh baby!');
                Events.findOneAndUpdate(
                    {'name':event.name, 'title':event.title},
                    thisEvent,
                    {upsert:true, new: true},
                    function(err, doc){
                        if (err){console.log(err)}
                    }
                );
            });
        }



//        async function getEvent(event) { // Async function statement
//          return 42;
//        }
//        let logNumber = async function() { // Async function expression
//          getEvent().then(function(value) {
//              console.log('||||||||||||||||||||||||||||||||||||||||');
//              console.log(value);
//              console.log('||||||||||||||||||||||||||||||||||||||||');
//            });
//        }
//        logNumber(); // 42

        getOldEvent(event);

//        Events.findOneAndUpdate(
//            {'name':event.name, 'title':event.title},
//            thisEvent,
//            {upsert:true, new: true},
//            function(err, doc){
//                if (err){console.log(err)}
//            }
//        );

//        thisEvent.save(function (err) {if (err) console.log ('Error on save!')});

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

    getOldEvents: function(res) {
        var today = new Date();
        var year = today.getFullYear();
        var month;
        if (today.getMonth() + 1 < 10) { month = today.getMonth() + 1;month = '0' + month; }
        else { month = today.getMonth() + 1; }
        var day = today.getDate();

        // Events.find({ $and: [ { when: { month: { $lte: parseInt(month) }, day: { $lt: day } } } ] })
        Events.find({ $and: [ { promotion: "Bellator" }, { 'when.year': { $lte: parseInt(year) } }, 
        { 'when.month': { $lte: parseInt(month) } }, { 'when.day': { $lte: parseInt(day) } } ] })
        .sort( { 'when.year': -1, 'when.month': -1, 'when.day': -1, 'when.hour': -1 } )
        .exec(function(err, results) {
            if (!err) {
                res.render('mma', {
                    results: results
                });
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
