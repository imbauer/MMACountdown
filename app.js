var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));

var request = require('request');

var dict = {
    'Flyweight': 'FLW',
    'Bantamweight': 'BW',
    'Featherweight': 'FW',
    'Lightweight': 'LW',
    'Welterweight': 'WW',
    'Middleweight': 'MW',
    'Light Heavyweight': 'LHW',
    'Heavyweight': 'HW',
    'Women\'s Strawweight': 'WSW',
    'Women\'s Flyweight': 'WFLW',
    'Women\'s Bantamweight': 'WBW',
    'Women\'s Featherweight': 'WFW',
};
var weightClasses = [
    'Flyweight','Bantamweight','Featherweight','Lightweight','Welterweight',
    'Middleweight','Light Heavyweight','Heavyweight','Women\'s Strawweight',
    'Women\'s Flyweight','Women\'s Bantamweight', 'Women\'s Featherweight'
    ];

var weightClassesVs = ['vs.','weight'];

var tvSlots = ['Early Preliminary Card','Preliminary Card'];
var regex = /(?=Early Preliminary Card)|(?=(?<!Early )Preliminary Card)|(?=\^)/g;
var weightRegex = /(?=\^)|(?=Women)|(?=(?<!Women..\s)Fly)|(?=(?<!Women..\s)Bantam)|(?=Featherweight)|(?=Lightweight)|(?=Welterweight)|(?=Middleweight)|(?=(?<!Light )Heavyweight)|(?=Light Heavyweight)/g;
var weightRegexAndVs = /(?:vs\.)|weight/g;
var infoRegex = /(?:.*UFC mixed martial arts event in \d{4})|Promotion(?=\w)|Information|Date|(?<!\s)\(|(?<=\d)-(?=\d)|\)Venue|(?<!\s)City|Event\schronology/g;

app.get('/', function(request, response) {
    response.send('Hello World!')
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));

    var currentEvent = 'UFC%20244'
//    currentEvent = 'UFC%20Fight%20Night:%20Cerrone%20vs.%20Gaethje';
    var url = "https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + currentEvent + "&prop=text";
//var url="https://en.wikipedia.org/w/api.php?action=parse&format=json&page=UFC%20Fight%20Night:%20Andrade%20vs.%20Zhang&prop=text";

    request(url, function (err, response, body) {
        if(err){
            var error = "cannot connect to the server";
            console.log(error);
        } else {

//name,    title,               timezone, year, month,  day, weekDay, hour, minute, AMPM, nextEvent
//UFC 241, CORMIER VS MIOCIC 2, EST,      2019, August, 17, Saturday, 10,   00,     PM

            body = body.replace(/<[^>]*>/g,'').replace(/\\n/g,'');
            var result = processUFC(body, currentEvent);
            console.log(result);

        }
    });
});

function processUFC(body, currentEvent) {
    var user = {};
    var fightsTotal = [];

    currentEvent = currentEvent.replace('%20', ' ');


    var arr = body.split("See also[edit]");
    var mainSection = arr[0].split("Fight Card");
    for (var i = 0; i < mainSection.length; i++) {
        var data = mainSection[i] + "\n";
        if (i === 0) {
            console.log(data);
            var info = data.split(infoRegex);
            info = info.filter(function(e){return e});
            if (info[0].includes('The poster')) {
                info[0] = info[0].split('The poster')[0];
            }
            info[info.length - 1] = info[info.length - 1].match(new RegExp(info[0] + "(.*)" + info[0]))[1];
            info[2] = info[2].replace( /\W|[0-9]/g , '');
            console.log(info);

            var country_list = ["USA","US","Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

            var city;
            var provState;
            var country;

            var locationCombined = info[7].split(', ');
            if (locationCombined.length < 3) {
                console.log(locationCombined[1]);
                if (country_list.includes(locationCombined[1]) === true) {
                    city = locationCombined[0];
                    country = locationCombined[1];
                }
                else {
                    city = locationCombined[0];
                    provState = locationCombined[1];
                    country = "USA"
                }
            }
            else if (locationCombined.length === 3) {
                city = locationCombined[0];
                provState = locationCombined[1];
                country = locationCombined[2];
            }


            user.name = info[0].split(': ')[0];
            user.title = info[0].split(': ')[1];
            user.nextEvent = info[info.length - 1];

            var location = {
                name : info[6],
                city : city,
                provState : provState,
                country : country
            }
            user.location = location;

            var timeZone;
            var year;
            var month;
            var day;
            var weekDay;
            var hour;
            var minute;
            var AMPM;

            var when = {
                timeZone : 'EST',
                year : info[3],
                month : info[4],
                monthString: info[2],
                day : info[5],
                weekDay : 'Friday',
                hour : '08',
                minute : '00',
                AMPM : 'PM'
            }
            user.when = when;



        }
        if (i === 1) {
//            console.log(data);
            data = data.substring(0, data.indexOf('Announced bout'));
            var tokens = data.split(regex);
//            console.log(tokens);
            for (var i = 0; i < tokens.length; i++) {
                var fights = [];
                var tokenSection = tokens[i].split(weightRegex);
                if (i === 0) {
                    var card = currentEvent;
                    tokenSection[0] = currentEvent;
                }
                else if (!tokenSection[0].includes('^')){
                    tokenSection[0] = currentEvent + ' ' + tokenSection[0];
                }
                else if (tokenSection[0].includes('^')){
                    fightsTotal.push([[tokenSection.join("")]]);
                    continue;
                }
                for (var j = 0; j < tokenSection.length; j++) {
                    var ts = tokenSection[j].split(weightRegexAndVs);
                    if (j !== 0 && ts.length === 3) {
                        ts[0] = ts[0] + 'weight';
                    }
                    fights.push(ts);
                }
                fightsTotal.push(fights);

            }

            user.fightCard = fights;

        }
    }

    user.fightCard = fightsTotal;

    return user;
}
function processPFL() {
     var pet = 'dog';
     console.log(pet);
}