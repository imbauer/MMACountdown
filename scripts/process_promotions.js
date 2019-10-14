module.exports =
{
    processUFC: function (body, currentEvent)  {

//        console.log('==============BODY===========');
//        console.log(body);
//        console.log('============END BODY =========');

        var tvSlots = ['Early Preliminary Card','Preliminary Card'];
        var cardSlots = /(?=Early Preliminary Card)|(?=(?<!Early )Preliminary Card)|(?=\^)/g;
        var weightClasses = /(?=\^)|(?=Women)|(?=(?<!Women..\s)Fly)|(?=(?<!Women..\s)Bantam)|(?=Featherweight)|(?=Lightweight)|(?=Welterweight)|(?=Middleweight)|(?=(?<!Light )Heavyweight)|(?=Light Heavyweight)/g;
        var fightSlots = /(?:vs\.)|weight/g;
        var eventDetailsParsing = /(?:.*UFC mixed martial arts event in \d{4})|Promotion(?=\w)|Information|Date|(?<!\s)\(|(?<=\d)-(?=\d)|\)Venue|(?<!\s)City|Event\schronology/g;
        var eventParsing = /(?:was a.*?==Results==)|(?:is an upcoming.*?==Fight\scard==)|(?=promotion=)|(?:{{MMAevent end.*)|(?===Fight card==)|(city=\s\[\[.*?previousevent)|(city=\s\[\[.*?attendance)|(city=\[\[.*?attendance)|(?=venue)|(?=date\|\d{4}\|\d{2}\|\d{2})|(followingevent.*?\}})|(?=\^)|(?:attendance=\|gate=\|)|(?:{\"batchcomplete.*?name)/g;
        //  (?=city).*?\|   (?=(city=\[\[.*?\|))
        var splitEvents = /(?:MMAevent\scard\|)|(?:MMAevent\scard\s\|)/g;
        var splitFights = /(?:MMAevent\sbout\|)|(?:MMAevent\sbout\s\|)/g;
        //  (?=Early Preliminary Card)|(?=(?<!Early )Preliminary Card)

        var events = [];
        var event = {};
        var fightsTotal = [];

        body = body.replace(/<[^>]*>/g,'').replace(/\\n/g,'').replace(/\s\s+/g, ' ');
        var info = body.split(eventParsing);
        info = info.filter(function(e){return e});
        // console.log(info);
        if (info[3].includes('date|')) {
            info.splice(3,1);
        }
       // console.log(info);
        if (info[8] !== undefined) {
            var fightCard = info[8].split(splitEvents);
            // console.log(fightCard);
        }
        else if (info[8] === undefined) {
            fightCard = [];
        }
        info.pop();
        fightCard.shift();
       console.log('=======================================      1      ===============================================');
       console.log(fightCard);
       console.log('============================================================================================================');
        for (var i = 0; i < fightCard.length; i++) {

//            console.log(fightCard[i]);
            fightCard[i] = fightCard[i].replace(/({|}|)/g, '').split(splitFights);

            for (var j = 0; j < fightCard[i].length; j++) {
//                console.log('=======================================      BEFORE REPLACE      ===============================================');
//                console.log(fightCard[i][j]);
                fightCard[i][j] = fightCard[i][j].replace(/(\|)\1+/g, '|').replace(/(\[)\1+/g, '[').replace(/(\])\1+/g, ']').replace(/[|]+$/g, '');
//                console.log('=======================================  ====== REPLACE ======     ============================================');
//                fightCard[i][j] = fightCard[i][j].replace(/(\|\|\|\|.*|\[|\]|\|header.*)/g, '').replace(/(\s\|)/g, '|');
//                console.log(fightCard[i][j]);
                //.replace(/(weight\|.*\(fighter\))/g, 'weight')
                fightCard[i][j] = fightCard[i][j].replace(/(\|def\.\|.*\(fighter\)\|)|(\|def\.\|.*\(fighter\)\s\|)|(\|def\.\|.*\(grappler\)\|)|(\|def\.\|.*\(grappler\)\s\|)/g, '|def.|').replace(/(\|vs\.\|.*\(fighter\)\|)|(\|vs\.\|.*\(fighter\)\s\|)|(\|vs\.\|.*\(grappler\)\|)|(\|vs\.\|.*\(grappler\)\s\|)/g, '|vs.|').replace(/(weight\|.*?\(fighter\)\|)|(weight\s\|.*?\(fighter\)\|)|(weight\s\|.*?\(fighter\)\s\|)|(weight\|.*?\(fighter\)\s\|)|(weight\|.*?\(grappler\)\|)|(weight\s\|.*?\(grappler\)\|)|(weight\|.*?\(grappler\)\s\|)|(weight\s\|.*?\(grappler\)\s\|)/g, 'weight|').replace(/(\[)|(\])/g, '').split('|');
//                console.log('=======================================      AFTER REPLACE      ===============================================');
//                console.log(fightCard[i][j]);
//                console.log('=======================================  ====== REPLACE ======     ============================================');
            }
        }
//        console.log('========================================     2     ========================================================');
//        console.log(fightCard);
//        console.log('============================================================================================================');
        for (var k = 0; k < info.length; k++) {
            info[k] = info[k].replace(/(\]\]\|.*)|(\]\]}})|(}}\|)/g, '');
        }
//        console.log('INFO HERE');
//        console.log('==========================');
//        console.log('==========================');
//        console.log('==========================');
//        console.log(info);
//        console.log();
//        console.log();
        info[0] = info[0].replace(/(\|.*)|(=\s)|(=)/g, '');
        info[1] = info[1].replace(/(.*=\[\[)/g, '');
        info[2] = info[2].replace(/(date\|)|(\}.*)/g, '').split('|');
//        info[3] = info[3].replace(/(venue=)|(\[)|(\])/g, '').replace(/(.*=)|(.*\|)/g, '');
        info[3] = info[3].replace(/(\[)|(\])|(.*=)|(\|)/g, '').trim();
        info[4] = info[4].replace(/(city\s=)|(city=)|(\[)|(\])|(\|attendance.*)/g, '').replace(/(,.*\(state\)\|)/g, ', ');
        info[5] = info[5].replace(/(.*=\[\[)|(\|.*)/g, '');
        info[6] = info[6].replace(/(.*=\[\[)|(\|.*)/g, '');
        // console.log('......................................................................');
        // console.log(info[7]);
        if (info[7] !== undefined) {
            info[7] = info[7].replace(/(.*?\()|([^a-zA-Z]or.*)|([^a-zA-Z]and.*)|(also known as )|(also known as)|(\))/g, '').replace(/(\')\1+/g, '').trim();
        }
        // console.log(info[7]);
        // console.log('......................................................................');


        var cycles = fightCard.length;
        if (cycles === 0) {
            cycles = 1;
        }
        for (var m = 0; m < cycles; m++) {
            event = {};
            event.name = info[0].split(/:\s/g)[0];
            if (m < 1) {
                event.title = info[0].split(/:\s/g)[1];
            }
            else {
                event.title = fightCard[m][0][0];
            }
            event.event = info[0];
            event.promotion = info[1];
            event.nextEvent = info[6];
            event.otherName = info[7];
            var location = {};
            location.name = info[3].replace(/(\(.*)/g, '').trim();
            var country_list = ["United States", "United States of America", "USA","US","Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
            var unitedStatesList = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

            var locationCombined = info[4].split(', ');
            for (var i = 0; i < locationCombined.length; i++) {
                locationCombined[i] = locationCombined[i].trim();
            }
//            console.log('------------------------');
            if (locationCombined.length < 3) {
                if (country_list.includes(locationCombined[1]) === true) {
                    location.city = locationCombined[0];
                    location.country = locationCombined[1];
                }
                else {
                    location.city = locationCombined[0];
                    location.provState = locationCombined[1];
                    if (unitedStatesList.includes(locationCombined[1]) === true) {
                        location.country = "United States";
                    }
                    else if (unitedStatesList.includes(locationCombined[1]) === false) {
                        location.country = "Brazil";
                    }
                }
            }
            else if (locationCombined.length === 3) {
                location.city = locationCombined[0];
                location.provState = locationCombined[1];
                location.country = locationCombined[2];
            }
            var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            var d = new Date(info[2][0], info[2][1] - 1, info[2][2]);
            var hour;
            if (m === 0) {
                hour = '20';
            }
            else if (m === 1) {
                hour = '18';
            }
            else if (m === 2) {
                hour = '16';
            }
            var when = {
                offset : 'America/New_York',
                year : (info[2][0]),
                month : ("0" + (info[2][1])).slice(-2),
                monthString: months[parseInt(info[2][1]) - 1],
                day : ("0" + (info[2][2])).slice(-2),
                weekDay : weekdays[d.getDay()],
                hour : ("0" + (hour)).slice(-2),
                minute : ("0" + ("0").slice(-2))
            }
            event.when = when;
            event.location = location;
            event.fightCard = fightCard[m];
            events.push(event);
        }
       console.log('============================================================================================================');
       console.log(events);
       console.log('============================================================================================================');
        return events;
    },

    processBellator: function (body, currentEvent)  {

//        console.log('==============BODY===========');
//        console.log(body);
//        console.log('============END BODY =========');

        var tvSlots = ['Early Preliminary Card','Preliminary Card'];
        var cardSlots = /(?=Early Preliminary Card)|(?=(?<!Early )Preliminary Card)|(?=\^)/g;
        var weightClasses = /(?=\^)|(?=Women)|(?=(?<!Women..\s)Fly)|(?=(?<!Women..\s)Bantam)|(?=Featherweight)|(?=Lightweight)|(?=Welterweight)|(?=Middleweight)|(?=(?<!Light )Heavyweight)|(?=Light Heavyweight)/g;
        var fightSlots = /(?:vs\.)|weight/g;
        var eventDetailsParsing = /(?:.*UFC mixed martial arts event in \d{4})|Promotion(?=\w)|Information|Date|(?<!\s)\(|(?<=\d)-(?=\d)|\)Venue|(?<!\s)City|Event\schronology/g;
        var eventParsing = /(?=name=)|(?:was a.*?==Results==)|(?:is an upcoming.*?==Fight\scard==)|(?=promotion=)|(?:{{MMAevent end.*)|(?===Fight card==)|(city=.*?\})|(city=\s)|(?=venue)|(?=\|date.*?venue)|(?=\^)|(?:attendance=\|gate=\|)|(?:{\"batchcomplete.*?name)/g;
        //  (?=city).*?\|   (?=(city=\[\[.*?\|))
        var splitEvents = /(?:MMAevent\scard\|)|(?:MMAevent\scard\s\|)/g;
        var splitFights = /(?:MMAevent\sbout\|)|(?:MMAevent\sbout\s\|)/g;
        var splitBellatorEvents = /(?====Bellator)/g;
        //  (?=Early Preliminary Card)|(?=(?<!Early )Preliminary Card)

        var events = [];
        var event = {};
        var fightsTotal = [];
        var allBellatorOfYear = [];

        body = body.replace(/<[^>]*>/g,'').replace(/\\n/g,'').replace(/\s\s+/g, ' ');

        allBellatorOfYear = body.split(splitBellatorEvents);
        allBellatorOfYear.shift();
//        console.log(allBellatorOfYear);

        for (var i = 0; i < allBellatorOfYear.length; i++) {
            var info = allBellatorOfYear[i].split(eventParsing);
            info = info.filter(function(e){return e});

            if (info[5] !== undefined) {
                var fightCard = info[5].split(splitEvents);
            }
            else if (info[5] === undefined) {
                fightCard = [];
            }
            info.pop();
            fightCard.shift();
//            console.log(i);
//            console.log(info);
//            console.log(fightCard);
//            console.log(i);
//            console.log(allBellatorOfYear[i]);
            for (var j = 0; j < fightCard.length; j++) {

                fightCard[j] = fightCard[j].replace(/({|}|)/g, '').split(splitFights);
                for (var k = 0; k < fightCard[j].length; k++) {
                    fightCard[j][k] = fightCard[j][k].replace(/(\|)\1+/g, '|').replace(/(\[)\1+/g, '[').replace(/(\])\1+/g, ']').replace(/[|]+$|header.*/g, '');
                    fightCard[j][k] = fightCard[j][k].replace(/(\|def\.\|.*\(fighter\)\|)|(\|def\.\|.*\(fighter\)\s\|)|(\|def\.\|.*\(grappler\)\|)|(\|def\.\|.*\(grappler\)\s\|)/g, '|def.|').replace(/(\|vs\.\|.*\(fighter\)\|)|(\|vs\.\|.*\(fighter\)\s\|)|(\|vs\.\|.*\(grappler\)\|)|(\|vs\.\|.*\(grappler\)\s\|)/g, '|vs.|').replace(/(weight\|.*?\(fighter\)\|)|(weight\s\|.*?\(fighter\)\|)|(weight\s\|.*?\(fighter\)\s\|)|(weight\|.*?\(fighter\)\s\|)|(weight\|.*?\(grappler\)\|)|(weight\s\|.*?\(grappler\)\|)|(weight\|.*?\(grappler\)\s\|)|(weight\s\|.*?\(grappler\)\s\|)/g, 'weight|').replace(/(\[)|(\])/g, '').split('|');
                    fightCard[j][k] = fightCard[j][k].filter(function(e){return e});
                }
            }
            for (var l = 0; l < info.length; l++) {
                info[l] = info[l].replace(/(\]\]\|.*)|(\]\]}})|(}}\|)/g, '');
            }
            info[0] = info[0].replace(/(\|.*)|(=\s)|(=)|(\{.*)/g, '');
            info[1] = info[1].replace(/(.*=\[\[)|(\|.*)|(name=)/g, '');
            info[2] = info[2].replace(/(date=)/g, '').split('|');
            info[2] = info[2].filter(function(e){return e});
            info[2] = info[2].join().replace(/(,)/g, '').split(/(?=\s)/g);
            info[3] = info[3].replace(/(\[)|(\])|(.*=)|(\|)/g, '').trim();
            info[4] = info[4].replace(/(city\s=)|(city=)|(\[)|(\])|(\|attendance.*)|(\})/g, '').replace(/(,.*\(state\)\|)/g, ', ');
//            console.log(i);
//            console.log(info);
//            console.log(fightCard);

            var cycles = fightCard.length;
            if (cycles === 0) {
                cycles = 1;
            }


            for (var m = 0; m < cycles; m++) {
                event = {};
                if (info[1].includes(':')) {
                    event.name = info[1].split(/:\s/g)[0];
                    if (m < 1) {
                        event.title = info[1].split(/:\s/g)[1];
                    }
                    else {
                        event.title = fightCard[m][0][0];
                    }
                }
                else if (info[1].includes('/')) {
                    event.name = info[1].split(/[/]/g)[1];
                    if (m < 1) {
                        event.title = info[1].split(/[/]/g)[0];
                    }
                    else {
                        event.title = fightCard[m][0][0];
                    }
                }
                else {
                    event.name = info[0];
                    event.title = undefined;
                }

                event.event = info[1];
                event.promotion = info[0].replace(/\s.*/g, '');
                event.nextEvent = undefined;
                event.otherName = undefined;
                var location = {};
                location.name = info[3].replace(/(\(.*)/g, '').trim();
                var country_list = ["England", "Wales", "Scotland", "United States", "United States of America", "USA","US","Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
                var unitedStatesList = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

                var locationCombined = info[4].split(', ');
                for (var n = 0; n < locationCombined.length; n++) {
                    locationCombined[n] = locationCombined[n].trim().replace(/(\|.*)/g, '');
                }
                // console.log(locationCombined);
                if (locationCombined.length < 3) {
                    // console.log(country_list.includes(locationCombined[1]));
                    if (country_list.includes(locationCombined[1]) === true) {
                        location.city = locationCombined[0];
                        location.country = locationCombined[1];
                    }
                    else {
                        location.city = locationCombined[0];
                        location.provState = locationCombined[1];
                        if (unitedStatesList.includes(locationCombined[1]) === true) {
                            location.country = "United States";
                        }
                        else if (unitedStatesList.includes(locationCombined[1]) === false) {
                            location.country = "Brazil";
                        }
                    }
                }
                else if (locationCombined.length === 3) {
                    location.city = locationCombined[0];
                    location.provState = locationCombined[1];
                    location.country = locationCombined[2];
                }



                for (var o = 0; o < info[2].length; o++) {
                    info[2][o] = info[2][o].trim();
                }


                var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                var month = months.indexOf(info[2][0]) + 1;
                var day = info[2][1];
                var d = new Date(info[2][2], months.indexOf(info[2][0]), day);
                var hour;
                if (m === 0) {
                    hour = '20';
                }
                else if (m === 1) {
                    hour = '18';
                }
                else if (m === 2) {
                    hour = '16';
                }
                else if (m === 3) {
                    hour = '14';
                }
                var when = {
                    offset : 'America/New_York',
                    year : (info[2][2]),
                    month : ("0" + (month)).slice(-2),
                    monthString: info[2][0],
                    day : ("0" + (day)).slice(-2),
                    weekDay : weekdays[d.getDay()],
                    hour : ("0" + (hour)).slice(-2),
                    minute : ("0" + ("0")).slice(-2)
                }
                event.when = when;
                event.location = location;
                event.fightCard = fightCard[m];
                events.push(event);
            }

        }

        // console.log('============================================================================================================');
        // console.log(events);
        // console.log('============================================================================================================');
        return events;
    }
};
