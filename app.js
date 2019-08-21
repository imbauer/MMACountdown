var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))


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
var weightClasses = ['Flyweight','Bantamweight','Featherweight','Lightweight','Welterweight',
    'Middleweight','Light Heavyweight','Heavyweight','Women\'s Strawweight',
    'Women\'s Flyweight','Women\'s Bantamweight', 'Women\'s Featherweight'];

var weightClassesVs = ['vs.','weight'];

var tvSlots = ['Early Preliminary Card','Preliminary Card'];
var regex = /(?=Early Preliminary Card)|(?=(?<!Early )Preliminary Card)/g;
var weightRegex = /(?=\^ For)|(?=Flyweight)|(?=Bantamweight)|(?=Featherweight)|(?=Lightweight)|(?=Welterweight)|(?=Middleweight)|(?=(?<!Light )Heavyweight)|(?=Heavyweight)/g;
var weightRegexAndVs = /(\s*(?:vs\.|^)\s*)|(\s*(?:Flyweight|^)\s*)|(?=Bantamweight)|(?=Featherweight)|(?=Welterweight)/g;

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));


//var query = 'ufc%20242';
//var query = 'UFC%20241:%20Cormier%20vs.%20Miocic%202'
//var url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json`;

var url="https://en.wikipedia.org/w/api.php?action=parse&format=json&page=UFC%20242&prop=text";
//var url="https://en.wikipedia.org/w/api.php?action=parse&format=json&page=UFC%20Fight%20Night:%20Andrade%20vs.%20Zhang&prop=text";


  request(url, function (err, response, body) {
   if(err){
   var error = "cannot connect to the server";
   console.log(error);
  } else {

//name,    title,               timezone, year, month,  day, weekDay, hour, minute, AMPM, nextEvent
//UFC 241, CORMIER VS MIOCIC 2, EST,      2019, August, 17, Saturday, 10,   00,     PM


//  body = body.replace(/<[^>]*>/g, "");
  body = body.replace(/<[^>]*>/g,'').replace(/\\n/g,'');
//  console.log(body);

//  console.log(processUFC(body));
    processUFC(body);

//  var arr = body.split("See also[edit]");
//  var mainSection = arr[0].split("Fight Card");
//  for (var i = 0; i < mainSection.length; i++) {
//      var data = mainSection[i] + "\n";
//        console.log(data);
//        console.log();
//        console.log();
//  }
//  console.log(arr[0]);
//  console.log();
////  console.log('body: ', body);
//  console.log(arr[1]);

   }
  });
});
function processUFC(body) {
    var arr = body.split("See also[edit]");
    var mainSection = arr[0].split("Fight Card");
      for (var i = 0; i < mainSection.length; i++) {
          var data = mainSection[i] + "\n";
          console.log(tvSlots.join('|'));
//          var tokens = data.split(new RegExp(tvSlots.join('|'), 'g'));

        if (i == 1) {
          var tokens = data.split(regex);
//          var tokens = data.split(new RegExp(weightClasses.join('|'), 'g'));
            console.log(tokens);
            for (var i = 0; i < tokens.length; i++) {
//                var tokenSection = tokens[i].split(new RegExp(weightClasses.join('|'), 'g'));
                var tokenSection = tokens[i].split(weightRegex);
                console.log();
                console.log('============== Token[' + i + ']============== ');
                console.log(tokenSection);
                console.log('===================================== ');
                console.log();
                console.log('---TS---');
                for (var j = 0; j < tokenSection.length; j++) {
//                    console.log(tokenSection[j]);
//                    var ts = tokenSection[j].split(weightRegexAndVs);
                    var ts = tokenSection[j].split(new RegExp(weightClassesVs.join('|'),'g'));;
                    console.log(ts);
//                    for (var k = 0; k < ts.length; k++) {
//                        console.log(ts[k]);
//                    }
                }
            }

        }
            console.log(data);
            console.log();
            console.log();
      }
//    return pet;
}
function processPFL() {
     var pet = 'dog';
     console.log(pet);
}