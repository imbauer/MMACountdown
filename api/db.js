
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var Events = require('./models/event.js');
var EventTimes = require('./models/eventTime.js');
var Fighters = require('./models/fighter.js');

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


var dict = {
  'Afghanistan': 'af', 'Aland Islands': 'ax', 'Albania': 'al','Albanian': 'al', 'Algeria': 'dz','Algerian': 'dz', 'American Samoa': 'as', 'Andorra': 'ad', 'Angola': 'ao', 'Anguilla': 'ai',
  'Antigua and Barbuda': 'ag', 'Argentina': 'ar','Argentinian': 'ar', 'Armenia': 'am','Armenian': 'am', 'Aruba': 'aw', 'Australia': 'au', 'Australian': 'au','Austria': 'at','Austrian': 'at', 'Azerbaijan': 'az', 'Bahamas': 'bs',
  'Bahrain': 'bh', 'Bangladesh': 'bd', 'Barbados': 'bb', 'Belarus': 'by','Belarusian people':'by', 'Belgium': 'be', 'Belize': 'bz', 'Benin': 'bj', 'Bermuda': 'bm',
  'Bhutan': 'bt', 'Bolivia': 'bo','Bolivian': 'bo', 'Bosnia and Herzegovina': 'ba', 'Botswana': 'bw', 'Brazil': 'br','Brazilian': 'br','Brazilian people':'br', 'Bulgaria': 'bg', 'Burkina Faso': 'bf', 'Burundi': 'bi',
  'Cabo Verde': 'cv', 'Cambodia': 'kh', 'Cameroon': 'cm', 'Canada': 'ca', 'Canadian': 'ca','Canadians': 'ca','Cayman Islands': 'ky', 'Central African Republic': 'cf', 'Chad': 'td', 'Chile': 'cl',
  'China': 'cn', 'Christmas Island': 'cx', 'Colombia': 'co', 'Comoros': 'km', 'Cook Islands': 'ck', 'Costa Rica': 'cr', 'Croatia': 'hr', 'Cuba': 'cu',
  'Curaçao': 'cw', 'Cyprus': 'cy', 'Czech Republic': 'cz', 'Côte d\'Ivoire': 'ci', 'Democratic Republic of the Congo': 'cd', 'Denmark': 'dk', 'Djibouti': 'dj',
  'Dominica': 'dm', 'Dominican Republic': 'do', 'Ecuador': 'ec', 'Egypt': 'eg', 'El Salvador': 'sv', 'England': 'gb-eng', 'Equatorial Guinea': 'gq', 'Eritrea': 'er',
  'Estonia': 'ee','Estonian': 'ee', 'Ethiopia': 'et', 'Falkland Islands': 'fk', 'Faroe Islands': 'fo', 'Fiji': 'fj', 'Finland': 'fi','Finnish': 'fi', 'France': 'fr','French': 'fr', 'French Guiana': 'gf',
  'French Polynesia':'pf', 'Gabon':'ga', 'Gambia':'gm', 'Georgia':'ge', 'Germany':'de','German':'de', 'Ghana':'gh', 'Gibraltar':'gi', 'Greece':'gr', 'Greenland':'gl', 'Grenada':'gd',
  'Guadeloupe':'gp', 'Guam':'gu', 'Guatemala':'gt', 'Guernsey':'gg', 'Guinea':'gn', 'Guinea-Bissau':'gw', 'Guyana':'gy', 'Haiti':'ht', 'Honduras':'hn', 'Hong Kong':'hk',
  'Hungary':'hu','Hungarian':'hu', 'Iceland':'is', 'India':'in', 'Indonesia':'id', 'Iran':'ir', 'Iraq':'iq', 'Ireland':'ie', 'Israel':'il', 'Italy':'it', 'Jamaica':'jm',
  'Japan':'jp', 'Jordan':'je', 'Kazakhstan':'jo', 'Kenya':'kz', 'Kiribati':'ki', 'Kosovo':'xk', 'Kuwait':'kw', 'Kyrgyzstan':'kg', 'Laos':'la', 'Latvia':'lv','Latvian':'lv',
  'Lebanon':'lb', 'Lesotho':'ls', 'Liberia':'lr', 'Libya':'ly', 'Liechtenstein':'li', 'Lithuania':'lt', 'Luxembourg':'lu', 'Macau':'mo', 'Madagascar':'mg', 'Malawi':'mw',
  'Malaysia':'my', 'Maldives':'mv', 'Mali':'ml', 'Malta':'mt', 'Martinique':'mq', 'Mauritania':'mr', 'Mauritius':'mu', 'Mayotte':'yt', 'Mexico':'mx','Mexican':'mx',
  'Moldova':'md', 'Monaco':'mc', 'Mongolia':'mn', 'Montenegro':'me', 'Montserrat':'ms', 'Morocco':'ma', 'Mozambique':'mz', 'Myanmar':'mm', 'Namibia':'na',
  'Nauru':'nr', 'Nepal':'np', 'Netherlands':'nl', 'New Caledonia':'nc', 'New Zealand':'nz','New Zealander':'nz', 'Nicaragua':'ni', 'Niger':'ne', 'Nigeria':'ng','Nigerian':'ng', 'Niue':'nu',
  'Norfolk Island':'nf', 'North Korea':'kp', 'North Macedonia':'mk', 'Northern Ireland':'gb-nir', 'Norway':'no', 'Oman':'om', 'Pakistan':'pk', 'Palau':'pw', 'Panama':'pa',
  'Papua New Guinea':'pg', 'Paraguay':'py', 'Peru':'pe', 'Philippines':'ph', 'Poland':'pl', 'Portugal':'pt', 'Puerto Rico':'pr', 'Qatar':'qa', 'Republic of the Congo':'cg',
  'Romania':'ro','Romanian':'ro', 'Russia':'ru','Russian':'ru', 'Dagestan':'ru', 'Rwanda':'rw', 'Samoa':'ws', 'San Marino':'sm', 'Saudi Arabia':'sa', 'Scotland':'gb-sct','People of Scotland':'gb-sct', 'Senegal':'sn', 'Serbia':'rs',
  'Singapore':'sg', 'Slovakia':'sk','Slovakian':'sk', 'Slovenia':'si', 'Solomon Islands':'sb', 'Somalia':'so', 'South Africa':'za', 'South Korea':'kr','Korean':'kr', 'South Sudan':'ss', 'Spain':'es',
  'Sri Lanka':'lk', 'Suriname':'sr','Surinamese':'sr','Palestine':'ps', 'Sudan':'sd', 'Swaziland':'sz', 'Sweden':'se', 'Switzerland':'ch', 'Syria':'sy', 'Taiwan':'tw', 'Tajikistan':'tj',
  'Tanzania':'tz', 'Thailand':'th', 'Tonga':'to', 'Trinidad and Tobago':'tt', 'Tunisia':'tn', 'Turkey':'tr', 'Turkmenistan':'tm', 'Uganda':'ug', 'Ukraine':'ua','Ukrainian':'ua',
  'United Arab Emirates':'ae', 'United Kingdom':'gb', 'United States of America':'us', 'American':'us','Americans':'us','United States':'us', 'U.S':'us', 'USA':'us', 'U.S.A.':'us', 'U.S.':'us', 'Uruguay':'uy', 'Uzbekistan':'uz',
  'Venezuela':'ve', 'Vietnam':'vn', 'Wales':'gb-wls', 'Western Sahara':'eh', 'Yemen':'ye', 'Zambia':'zm', 'Zimbabwe':'zw'
};


const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
// const url = "mongodb://admin:your_password@db:27017/mmaInfo?authSource=admin";



module.exports = {

    connectDB: function() {
        mongoose.connect(url, options).then( function() {
          console.log('MongoDB is connected');
        })
          .catch( function(err) {
          console.log(err);
      });
    },

    // connectDB: function() {
    //     mongoose.connect(url, function(err) {
    //         if (err) {
    //             console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
    //             setTimeout(connectDB, 5000);
    //         }
    //     });
    // },

    addEventTime: function(res, eventName, eventTitle, eventEvent, eventHour, eventMinute) {
        var eventTimeObj = {};
        eventTimeObj.name = eventName;
        eventTimeObj.title = eventTitle;
        eventTimeObj.event = eventEvent;
        eventTimeObj.hour = eventHour;
        eventTimeObj.minute = eventMinute;
        EventTimes.findOneAndUpdate(
            {'name':eventName, 'title':eventTitle, 'event': eventEvent},
            eventTimeObj,
            {upsert:true, new: true},
            function(err, doc){
                if (err){console.log(err)}
                else {
                    console.log('Event already exists in DB ---> Checking fight order and refreshing');
                    res.send(eventTimeObj);
                }
            }
        );
    },

    clearData: function() {
        var today = new Date();
        var year = today.getFullYear().toString();
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        var day = ("0" + (today.getDate())).slice(-2);
        console.log(year);
        console.log(month);
        console.log(day);

        Events.find({}, function(err, events) {

            events.forEach(function(event) {

                if (event.when.year > year) {
                    Events.deleteOne({ name:event.name, title: event.title, event: event.event }, function (err) {});
                }
                else if (event.when.year === year) {
                    if (event.when.month > month) {
                        Events.deleteOne({ name:event.name, title: event.title, event: event.event }, function (err) {});
                    }
                    else if (event.when.month === month) {
                        if (event.when.day > day) {
                            Events.deleteOne({ name:event.name, title: event.title, event: event.event }, function (err) {});
                        }
                    }
                }

            });

        });

    },


    getAllFightersFromEvents: function() {

        return new Promise((resolve, reject) => {

            var fighters = [];
            var fighter1;
            var fighter2;

            Events.find({}, function(err, events) {

                if (err) {
                  return err;
                }

                events.forEach(function(event) {

                    for (var i = 0; i < event.fightCard.length; i++) {
                        if (event.fightCard[i].length > 2) {

                            // console.log(event.fightCard[i][1] + ' <-----> ' + event.fightCard[i][3]);
                            fighter1 = event.fightCard[i][1].replace(/\s\(.*/g, '');
                            fighter2 = event.fightCard[i][3].replace(/\s\(.*/g, '');
                            fighters.push(fighter1);
                            fighters.push(fighter2);

                        }
                    }

                });

                var unique = [...new Set(fighters)];

                // console.log('------------------------- All Fighters List -------------------------');
                // console.log(unique);
                // console.log('---------------------------------------------------------------------');
                return resolve(unique);

            });

        })

    },

    getFighter: function(fighter) {
        return new Promise((resolve, reject) => {

            Fighters.findOne({ "name" : fighter }, function(err, fighter) {

                if (err) {
                  return err;
                }

                return resolve(fighter);

            });

        })
    },

    addFighter: function(fighter) {

        if (fighter !== undefined) {

            if (fighter.birth_place !== undefined) {

                var countryOptions = fighter.birth_place.replace(/\(|\)|today\s/g, '').replace(/,\s/g, ' ').replace(/,/g, ' ').split(' ');
                console.log(countryOptions);
                for (var i = countryOptions.length - 1; i >= 0; i--) {
                    if (dict[countryOptions[i]] !== undefined) {
                        fighter.co = dict[countryOptions[i]];
                        fighter.country = countryOptions[i];
                        break;
                    }
                    if (i < countryOptions.length - 1) {
                        var combined = countryOptions[i] + ' ' + countryOptions[i + 1];
                        if (dict[combined] !== undefined) {
                            fighter.co = dict[combined];
                            fighter.country = combined;
                            break;
                        }
                    }
                }
                if ((fighter.co === undefined || fighter.co === null) && fighter.nationality !== undefined) {
                    fighter.co = dict[fighter.nationality];
                    fighter.country = fighter.nationality;
                }
                // console.log(fighter);

                Fighters.findOneAndUpdate(
                    {'name':fighter.name},
                    fighter,
                    {upsert:true, new: true},
                    function(err, doc){
                        if (err){console.log(err)}
                    }
                );

            }
            else {
                if ((fighter.co === undefined || fighter.co === null) && fighter.nationality !== undefined) {
                    fighter.co = dict[fighter.nationality];
                    fighter.country = fighter.nationality;
                }
                console.log('NO BIRTHPLACE');
                Fighters.findOneAndUpdate(
                    {'name':fighter.name},
                    fighter,
                    {upsert:true, new: true},
                    function(err, doc){
                        if (err){console.log(err)}
                    }
                );
            }
        }



    },

    addEvent: function(event) {
        event.location.co = dict[event.location.country];


        function getEventTime(event) {
            return EventTimes.findOne({name:event.name, title: event.title, event: event.event})
            .then((eventTime) => {

                if (eventTime !== null) {
                    event.when.hour = ("0" + eventTime.hour).slice(-2);
                    event.when.minute = ("0" + eventTime.minute).slice(-2);
                }
                console.log('About to run CHECKER');
                getOldEvent(event);
            })
            .catch((err) => {
                getOldEvent(event);
                console.log(err);
            });
        }




        function getOldEvent(event) {
            console.log(event.name);
            console.log(event.title);
            console.log(event.event);
            return Events.findOne({name:event.name, title: event.title, event: event.event}) // Notice the return here
            .lean()
            .exec()
            .then((previousEvent) => {

                if (previousEvent.fightCard !== undefined || previousEvent.fightCard !== null || previousEvent.fightCard !== []) {
                    for (var i = 0; i < previousEvent.fightCard.length; i++) {
                        if (previousEvent.fightCard[i].length === 4 || previousEvent.fightCard[i].length === 5) {
                            if (event.fightCard[i].length === 4 || event.fightCard[i].length === 5) {
                                // Do nothing
                            }
                            else if (event.fightCard[i].length > 5) {
                                if (event.fightCard[i][1] === previousEvent.fightCard[i][1]) {
                                    // Do nothing
                                }
                                else if (event.fightCard[i][3] === previousEvent.fightCard[i][1]) {
                                    event.fightCard[i][2] = 2;
                                    event.fightCard[i][3] = previousEvent.fightCard[i][3];
                                    event.fightCard[i][1] = previousEvent.fightCard[i][1];
                                }
                            }
                        }
                        else if (previousEvent.fightCard[i].length > 3) {
                            // Do nothing
                        }
                    }
                }

                var thisEvent = new Events(event);

                Events.findOneAndUpdate(
                    {'name':event.name, 'title':event.title, 'event': event.event},
                    thisEvent,
                    {upsert:true, new: true},
                    function(err, doc){
                        if (err){console.log(err)}
                        else {
                            console.log('Event already exists in DB ---> Checking fight order and refreshing');
                        }
                    }
                );
                return previousEvent;
            })
            .catch((err) => {
                console.log('Event did not already exist in DB ---> Being saved fresh');
                var thisEvent = new Events(event);
                Events.findOneAndUpdate(
                    {'name':event.name, 'title':event.title, 'event': event.event},
                    thisEvent,
                    {upsert:true, new: true},
                    function(err, doc){
                        if (err){console.log(err)}
                    }
                );
            });
        }
        console.log('About to run getEventTime');
        getEventTime(event);

    },



    renderAll: function(res, when, promotion, slot) {

        var promotions = new RegExp(promotion, 'i');

        var titleRegex = new RegExp('(^((?!Prelim).)*$)|(^\s*$)', 'i');
        if (slot !== "main") {
            titleRegex = new RegExp('(.*)|(^\s*$)', 'i');
        }
        console.log('5555555555555555555555');
        console.log('5555555555555555555555');
        console.log(slot !== "main");
        console.log(titleRegex);
        console.log('5555555555555555555555');
        console.log('5555555555555555555555');

        var compare_0 = '$gt';
        var compare_1 = '$gte';
        var dayCompare_0 = '$gte';
        var direction__ = 1;

        if (when === "past") {
            compare_0 = '$lt';
            compare_1 = '$lte';
            dayCompare_0 = '$lt';
            direction__ = -1;
        }

        var today = new Date();
        var year = today.getFullYear();
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        var day = ("0" + (today.getDate())).slice(-2);

        var yearComparer_0 = {};
        var yearComparer_1 = {};
        yearComparer_0[compare_0] = parseInt(year);
        yearComparer_1[compare_1] = parseInt(year);

        var monthComparer_0 = {};
        var monthComparer_1 = {};
        monthComparer_0[compare_0] = month;
        monthComparer_1[compare_1] = month;

        var dayComparer_0 = {};
        dayComparer_0[dayCompare_0] = day;

        Events.find({
            $or : [
                { $and : [ { 'when.year': yearComparer_0 }, { promotion: promotions }, { title: titleRegex } ] },
                { $and : [ { 'when.year': yearComparer_1 }, { 'when.month': monthComparer_0 }, { promotion: promotions }, { title: titleRegex } ] },
                { $and : [ { 'when.year': yearComparer_1 }, { 'when.month': monthComparer_1 }, { 'when.day': dayComparer_0 }, { promotion: promotions }, { title: titleRegex } ] }
            ]
        })
        .sort( { 'when.year': direction__, 'when.month': direction__, 'when.day': direction__, 'when.hour': direction__ } )
        .exec(function(err, results) {
            if (!err) {
                res.send({results: results});
            } else {
                // error handling
            };
        });
    },



    renderEvents: function(res) {
        Events.find({}).sort( { 'when.year': 1, 'when.month': 1, 'when.day': 1, 'when.hour': 1 } ).exec(function(err, results) {
            if (!err) {
                res.send({results: results});
            } else {
                // error handling
            };
        });
    }

}
