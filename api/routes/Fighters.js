var express = require('express');
var mongodb = require('../db');
var router = express.Router();
var request = require('request');

//SETUP GET FIGHTER DATA DONT REPEAT
// router.get('/fighter/data/:fighterName', function(req, res) {
//     var fighter = req.params.fighterName.replace(/\s/g, '\%20').replace(/\+/g, '\%2B');
//     fightersWiki.getFighterWikiData(fighter)
//         .then(fighterData => {
//             console.log('------------------------- fighterData -------------------------');
//             console.log(fighterData);
//             console.log('-------------------------------------------------------------------------------');
//         })
//         .catch(err => {
//             console.log(err);
//         })
// });


router.get('/fighter/:fighterName', function(req, res) {
    var fighter = req.params.fighterName;
    mongodb.getFighter(fighter)  // Returns a Promise!
        .then(fighter => {
            console.log('------------------------- Gonna Respond With Fighter -------------------------');
            console.log(fighter);
            console.log('-------------------------------------------------------------------------------');
            var record = fighter.fightRecord[1][0].replace(/[A-Za-z]/g, '');
            var results = {};
            results.nationality = fighter.co;
            results.record = record

            res.send({results: results});


        })
        .catch(err => {
            console.log(err);
            res.send({results: 'N/A'});
        })
});


router.get('/loadAllFightersFromEvents', function(req, res) {
    mongodb.getAllFightersFromEvents()  // Returns a Promise!
        .then(fighters => {
            console.log('------------------------- Get All Fighters (List) -------------------------');
            console.log(fighters);
            console.log('-------------------------------------------------------------------------------');

            getNextFighter(fighters, fighters[0]);


        })
        .catch(err => {
            console.log(err);
        })
});

function getNextFighter(fighters, fighter) {
    console.log(fighter);

    getFighterWikiData(fighter)
        .then(fighterData => {
            console.log('------------------------- fighterData [' + fighters.indexOf(fighter) + '] -------------------------');
            // console.log(fighterData);
            mongodb.addFighter(fighterData);
            console.log('-------------------------------------------------------------------------------');
            // console.log(fighters.indexOf(fighter));
            // console.log(fighters[fighters.indexOf(fighter) + 1]);
            if ((fighters.indexOf(fighter) + 1 !== -1 || fighters.indexOf(fighter) + 1 !== 0) && fighters.indexOf(fighter) < 400) {
                getNextFighter(fighters, fighters[fighters.indexOf(fighter) + 1]);
            }
        })
        .catch(err => {
            console.log(err);
        })

}



function getFighterWikiData(fighter) {

    return new Promise((resolve, reject) => {

        console.log('Got to here');

        var URI = encodeURIComponent(fighter).replace(/%2520/g, '%20').replace(/%252B/g, '%2B');
        var url = 'http://192.168.99.100:9000/fightersWiki/fighter/data/' + URI;
        request(url, function (err, response, body) {
            if(err){
                console.log(err + ' ERR: Stopped at ---> ' + url);
            } else {
                if (body === 'Error') {
                    console.log('Yup, now youre gonna have to call the other possibilities');
                    url = url + ' (fighter)';
                    request(url, function (err, response, body) {
                        if(err){
                            console.log(err + ' ERR: Stopped at ---> ' + url);
                        } else {
                            if (body === 'Error') {
                                url = url.replace(/(\s\(.*)|(%20\(.*)/g, '') + ' (MMA)';
                                console.log('Yup, now youre gonna have to call the other possibilities (fighter layer)');
                                request(url, function (err, response, body) {
                                    if(err){
                                        console.log(err + ' ERR: Stopped at ---> ' + url);
                                    } else {
                                        if (body === 'Error') {
                                            url = url.replace(/(\s\(.*)|(%20\(.*)/g, '') + ' (grappler)';
                                            console.log('Yup, now youre gonna have to call the other possibilities (MMA layer)');
                                            request(url, function (err, response, body) {
                                                if(err){
                                                    console.log(err + ' ERR: Stopped at ---> ' + url);
                                                } else {
                                                    if (body === 'Error') {
                                                        url = url.replace(/(\s\(.*)|(%20\(.*)/g, '') + ' (wrestler)';
                                                        console.log('Yup, now youre gonna have to call the other possibilities (wrestler layer)');
                                                        request(url, function (err, response, body) {
                                                            if(err){
                                                                console.log(err + ' ERR: Stopped at ---> ' + url);
                                                            } else {
                                                                if (body === 'Error') {
                                                                    url = url.replace(/(\s\(.*)|(%20\(.*)/g, '') + ' (kickboxer)';
                                                                    console.log('Yup, now youre gonna have to call the other possibilities (kickboxer layer)');
                                                                    request(url, function (err, response, body) {
                                                                        if(err){
                                                                            console.log(err + ' ERR: Stopped at ---> ' + url);
                                                                        } else {
                                                                            if (body === 'Error') {
                                                                                console.log('This guy is a can and doesnt have a WIKIPEDIA page');
                                                                                return resolve();
                                                                            }
                                                                            else {
                                                                                var data = JSON.parse(body);
                                                                                return resolve(data);
                                                                                // mongodb.addFighter(data);
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                                else {
                                                                    var data = JSON.parse(body);
                                                                    return resolve(data);
                                                                    // mongodb.addFighter(data);
                                                                }
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        var data = JSON.parse(body);
                                                        return resolve(data);
                                                        // mongodb.addFighter(data);
                                                    }
                                                }
                                            });
                                        }
                                        else {
                                            var data = JSON.parse(body);
                                            return resolve(data);
                                            // mongodb.addFighter(data);
                                        }
                                    }
                                });
                            }
                            else {
                                var data = JSON.parse(body);
                                return resolve(data);
                                // mongodb.addFighter(data);
                            }
                        }
                    });
                }
                else {
                    var data = JSON.parse(body);
                    return resolve(data);
                    // mongodb.addFighter(data);
                }
            }
        });

    });

}



module.exports = router;
