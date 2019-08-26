module.exports =
{
    processUFC: function (body, currentEvent)  {

//        var currentEvent = 'UFC%20242'
    //    currentEvent = 'UFC%20on%20ESPN%2B%2021';
    //    currentEvent = 'UFC%20Fight%20Night:%20Cerrone%20vs.%20Gaethje';
    //    var url="https://en.wikipedia.org/w/api.php?action=parse&format=json&page=UFC%20Fight%20Night:%20Andrade%20vs.%20Zhang&prop=text";

        var tvSlots = ['Early Preliminary Card','Preliminary Card'];
        var cardSlots = /(?=Early Preliminary Card)|(?=(?<!Early )Preliminary Card)|(?=\^)/g;
        var weightClasses = /(?=\^)|(?=Women)|(?=(?<!Women..\s)Fly)|(?=(?<!Women..\s)Bantam)|(?=Featherweight)|(?=Lightweight)|(?=Welterweight)|(?=Middleweight)|(?=(?<!Light )Heavyweight)|(?=Light Heavyweight)/g;
        var fightSlots = /(?:vs\.)|weight/g;
        var eventDetailsParsing = /(?:.*UFC mixed martial arts event in \d{4})|Promotion(?=\w)|Information|Date|(?<!\s)\(|(?<=\d)-(?=\d)|\)Venue|(?<!\s)City|Event\schronology/g;

        var event = {};
        var fightsTotal = [];

        currentEvent = currentEvent.replace('%20', ' ');

        var arr = body.split("See also[edit]");
        var mainSection = arr[0].split("Fight Card");
        for (var i = 0; i < mainSection.length; i++) {
            var data = mainSection[i] + "\n";
            if (i === 0) {
                var info = data.split(eventDetailsParsing);
                info = info.filter(function(e){return e});
                if (info[0].includes('+')) { // Error when calling special characters into an API call, must use escape characters
                    info[0] = info[0].replace('+', '\\+');
                }
                if (info[0].includes('The poster')) { // Remove unneeded text from title of event
                    info[0] = info[0].split('The poster')[0];
                }
                info[info.length - 1] = info[info.length - 1].match(new RegExp(info[0] + "(.*)" + info[0]))[1]; // Extract next event title
                info[2] = info[2].replace( /\W|[0-9]/g , ''); // Remove extra text after month name

                var country_list = ["USA","US","Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

                var city, provState, country;

                // Gets all information about location of event
                var locationCombined = info[7].split(', ');
                if (locationCombined.length < 3) {
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


                event.name = info[0].replace('\\', '').split(': ')[0];
                event.title = info[0].split(': ')[1];
                event.nextEvent = info[info.length - 1];

                var location = {
                    name : info[6],
                    city : city,
                    provState : provState,
                    country : country
                }
                event.location = location;

                var timeZone;
                var year;
                var month;
                var day;
                var weekDay;
                var hour;
                var minute;
                var AMPM;

                var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

                var d = new Date(info[3], info[4] - 1, info[5]);

                var when = {
                    timeZone : 'EST',
                    year : info[3],
                    month : info[4],
                    monthString: info[2],
                    day : info[5],
                    weekDay : weekday[d.getDay()],
                    hour : '18',
                    minute : '00',
                    AMPM : 'PM'
                }
                event.when = when;

            }
            if (i === 1) { // Section for extracting fight card information from the Wikipedia API
                if (data.includes('Announced bout')) { // Removes unneeded data from end of data
                    data = data.substring(0, data.indexOf('Announced bout'));
                }
                var fightCards = data.split(cardSlots);
                for (var i = 0; i < fightCards.length; i++) {
                    var fights = []; // Reset fights array for each separate card to be parsed through
                    var fightCard = fightCards[i].split(weightClasses);
                    if (i === 0) {
                        fightCard[0] = currentEvent;
                    }
                    else if (!fightCard[0].includes('^')){
                        fightCard[0] = currentEvent + ' ' + fightCard[0];
                    }
                    else if (fightCard[0].includes('^')){
                        fightsTotal.push([[fightCard.join("")]]);
                        continue;
                    }
                    for (var j = 0; j < fightCard.length; j++) {
                        var fight = fightCard[j].split(fightSlots);
                        if (j !== 0 && fight.length === 3) {
                            fight[0] = fight[0] + 'weight';
                        }
                        fights.push(fight);
                    }
                    fightsTotal.push(fights);
                }
                event.fightCard = fights;
            }
        }
    event.fightCard = fightsTotal;
    return event;
  },

  processPFL: function ()
  {

  }
};