
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

var fighterSchema = new mongoose.Schema({
    "_id": false,
    name: String,
    birth_place: String,
    other_names: String,
    nationality: String,
    weight: String,
    weight_class: String,
    residence: String,
    reach_in: String,
    stance: String,
    wrestling: String,
    style: String,
    fighting_out_of: String,
    team: String,
    fighting_out_of: String,
    years_active: String,
    mma_kowin: String,
    mma_subwin: String,
    mma_decwin: String,
    mma_koloss: String,
    mma_subloss: String,
    mma_decloss: String,
    age: Number,
    country: String,
    co: String,
    fightRecord: Array
});

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
        offset: String,
        year: String,
        month: String,
        monthString: String,
        day: String,
        weekDay: String,
        hour: String,
        minute: String
    },
    fightCard: Array
});

var eventTimeSchema = new mongoose.Schema({
    "_id": false,
    name: String,
    title: String,
    event: String,
    hour: String,
    minute: String
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
  'Romania':'ro', 'Russia':'ru', 'Dagestan':'ru', 'Rwanda':'rw', 'Samoa':'ws', 'San Marino':'sm', 'Saudi Arabia':'sa', 'Scotland':'gb-sct', 'Senegal':'sn', 'Serbia':'rs',
  'Singapore':'sg', 'Slovakia':'sk', 'Slovenia':'si', 'Solomon Islands':'sb', 'Somalia':'so', 'South Africa':'za', 'South Korea':'kr', 'South Sudan':'ss', 'Spain':'es',
  'Sri Lanka':'lk', 'Palestine':'ps', 'Sudan':'sd', 'Swaziland':'sz', 'Sweden':'se', 'Switzerland':'ch', 'Syria':'sy', 'Taiwan':'tw', 'Tajikistan':'tj',
  'Tanzania':'tz', 'Thailand':'th', 'Tonga':'to', 'Trinidad and Tobago':'tt', 'Tunisia':'tn', 'Turkey':'tr', 'Turkmenistan':'tm', 'Uganda':'ug', 'Ukraine':'ua',
  'United Arab Emirates':'ae', 'United Kingdom':'gb', 'United States of America':'us', 'United States':'us', 'U.S':'us', 'USA':'us', 'U.S.A.':'us', 'U.S.':'us', 'Uruguay':'uy', 'Uzbekistan':'uz',
  'Venezuela':'ve', 'Vietnam':'vn', 'Wales':'gb-wls', 'Western Sahara':'eh', 'Yemen':'ye', 'Zambia':'zm', 'Zimbabwe':'zw'
};

eventSchema.index({name: 1, title: 1, event: 1}, {unique: true});

fighterSchema.index({name: 1}, {unique: true});

eventTimeSchema.index({name: 1, title: 1}, {unique: true});

var Events = mongoose.model('events', eventSchema);

var EventTimes = mongoose.model('eventTimes', eventTimeSchema);

var Fighters = mongoose.model('fighters', fighterSchema);

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
        var year = today.getFullYear();
        var month;
        if (today.getMonth() + 1 < 10) { month = today.getMonth() + 1;month = '0' + month; }
        else { month = today.getMonth() + 1; }
        var day = today.getDate();

        Events.find({}, function(err, events) {

            events.forEach(function(event) {
                if (event.when.year > parseInt(year)) {
                    Events.deleteOne({ name:event.name, title: event.title, event: event.event }, function (err) {});
                    // console.log('Deleted at year');
                }
                else if (event.when.year === parseInt(year)) {
                    if (event.when.month > parseInt(month)) {
                        Events.deleteOne({ name:event.name, title: event.title, event: event.event }, function (err) {});
                        // console.log('Deleted at month');
                    }
                    else if (event.when.month === parseInt(month)) {
                        if (event.when.day > parseInt(day)) {
                            Events.deleteOne({ name:event.name, title: event.title, event: event.event }, function (err) {});
                            // console.log('Deleted at day');
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



    addFighter: function(fighter) {
        if (fighter !== undefined) {

            if (fighter.birth_place !== undefined && fighter.fightRecord !== undefined) {
                var countryOptions = fighter.birth_place.replace(/\(|\)|today\s/g, '').split(', ');
                console.log(countryOptions);
                for (var i = countryOptions.length - 1; i >= 0; i--) {
                    if (dict[countryOptions[i]] !== undefined) {
                        fighter.co = dict[countryOptions[i]];
                        fighter.country = countryOptions[i];
                        break;
                    }
                }
                console.log(fighter);

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
                console.log('====== FOUND EVENT TIME ==========');
                if (eventTime !== null) {
                    console.log(eventTime.hour);
                    console.log(eventTime.minute);
                    console.log(eventTime);
                    event.when.hour = ("0" + eventTime.hour).slice(-2);
                    event.when.minute = ("0" + eventTime.minute).slice(-2);
                    console.log(event.when);
                }
                getOldEvent(event);
            })
            .catch((err) => {
                console.log('========= DIDNT FIND EVENT TIME >:C ============');
                getOldEvent(event);
                console.log(err);
            });
        }




        function getOldEvent(event) {
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
        getEventTime(event);

    },

    renderPastEvents: function(res) {
        var today = new Date();
        var year = today.getFullYear();
        var month;
        if (today.getMonth() + 1 < 10) { month = today.getMonth() + 1;month = '0' + month; }
        else { month = today.getMonth() + 1; }
        var day = today.getDate();

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

    renderEvents: function(res) {
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
