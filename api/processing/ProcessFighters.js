module.exports =
{
    processFighter: function (body, fighterName)  {

        try {

            if (!body.includes('mma') && !body.includes('MMA')) {
                throw new Error("Something bad happened")
            }

            body = body.replace(/<[^>]*>/g,'').replace(/\\n/g,'').replace(/\s\s+/g, ' ').replace(/\'\'\'.*?(?=MMA record start)|(?=\{\{end\}\}).*/g, '');
            // console.log(body);
            var eventParsing = /(?=MMA record start)|(?:{\"batchcomplete.*?name =)|(?:{\"batchcomplete.*?name=)/g;
            var mmaRecordFightsParsing = /(?=\}\}Draw)|(?=\}\}Win)|(?=\}\}Loss)|(?=\}\}Lose)|(?=\}\}\sDraw)|(?=\}\}\sWin)|(?=\}\}\sLoss)|(?=\}\}\sLose)/g;
            var info = body.split(eventParsing);
            var details = {};
            var personalDetails;
            var birthDetails;
            var record;
            var dictPart;
            info = info.filter(function(e){return e});
            // console.log(info);
            for (var i = 0; i < info.length; i++) {

                if (i === 0) {
                    personalDetails = info[i];
                    personalDetails = personalDetails.replace(/(spouse.*?\|)|(Spouse.*?\|)|(\\t)|(year=)|(month=)|(day=)|(df=.*?\|)|(abbr=.*?\|)|(death_cause.*?\|)|(death_date.*?\|)|(death_place.*?\|)|(\{.irth.*?age(?!df)*?\|)|(Birth.*?age(?!df)*?\|)|(Birth.*?df.*?\|)|(kickbox_.*?\|)|(height_footnote.*?\|)|(reach_footnote.*?\|)|(weight_footnote.*?\|)|(native_name.*?\|)|(image.*?\|)|(alt =.*?\|)|(caption =.*?\|)|(birth_name.*?\|)|(cite.*?date.*?\}\})|(Cite.*?date.*?\}\})|((?!\s)mma_draw.*)|(\smma_draw.*)/g, '');
                    personalDetails = personalDetails.replace(/(box_.*?\|)|(\{)|(\})|(\[)|(\])|(\'\')|(title.*?\|)|(publisher.*?\|)|(url.*?\|)|(accessdate.*?\|)/g, '').replace(/(\s\(MMA\)\|.*weight)/g, '|');
                    personalDetails = personalDetails.split(/\|(?=((?![0-9]{1}))((?!ft))((?!in))((?!kg))((?!lb))((?!month))((?!day))((?!year))((?!NCAA))((?!Division)))/g);
                    personalDetails.shift();
                    personalDetails = personalDetails.filter(function(e){return e});
                    // console.log(personalDetails);
                    // console.log('JIFREGJRETGYREHJEJNHJREIOHGRE');
                    // console.log(personalDetails);
                    // console.log('JIFREGJRETGYREHJEJNHJREIOHGRE');
                    for (var p = 0; p < personalDetails.length; p++) {
                        personalDetails[p] = personalDetails[p].trim();
                        dictPart = personalDetails[p].split('=');
                        if (dictPart.length !== 2) {
                            // console.log(dictPart.length);
                            // console.log(personalDetails[p]);
                        }
                        else if (dictPart.length === 2) {
                            dictPart[0] = dictPart[0].trim();
                            dictPart[1] = dictPart[1].trim();
                            console.log(dictPart);
                            details[dictPart[0]] = dictPart[1];
                        }
                    }
                    details.name = fighterName;
                    // console.log('---------------------- Details ----------------------');
                    birthDetails = details['birth_date'].split('|');
                    var today = new Date();
                    var birthDate = new Date(birthDetails[0] + '-' + birthDetails[1] + '-' + birthDetails[2]);
                    var age = today.getFullYear() - birthDate.getFullYear();
                    var m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age = age - 1;
                    }
                    details.age = age;
                    // console.log(details);
                    // console.log('-----------------------------------------------------');
                }


                if (i === 1) {
                    console.log(info[i]);
                    info[i] = info[i].replace(/(\|align.*?\|)/g, '');
                    info[i] = info[i].split(mmaRecordFightsParsing);
                    // console.log(info[i]);
                    for (var k = 0; k < info[i].length; k++) {

                        info[i][k] = info[i][k].replace(/( format.*?\|)|(format.*?\|)|(dts.*?\|)|(\| align.*?\|)|(\|align.*?\|)/g, '').replace(/((?<=[a-zA-Z])\).*?(?=[0-9]{4}\|))|(N\\A.*?(?=[0-9]{4}\|))|(\|.*?MMA\)\|)|(\|.*?fighter\)\|)|(\|.*?grappler\)\|)|(?=[0-9]{4})-/g, '|').replace(/(\{)|(\})|(\[)|(\])|(?:\(fighter\).*?\|.*?(?=\|))|(?:\(grappler\).*?\|.*?(?=\|))|(\|\-\|)|(\()|(\))/g, '');
                        console.log(info[i][k]);
                        info[i][k] = info[i][k].split('|');

                        info[i][k].length = 7;
                        if (k === 0) {
                            info[i][k].length = 1;
                            info[i][k] = [info[i][k][0].replace(/(start.*)/g, '')];
                            continue;
                        }
                        console.log(info[i][k]);
                        for (var q = 0; q < info[i][k].length; q++) {
                            info[i][k][q] = info[i][k][q].trim();
                        }

                    }
                    record = info[i];
                    // console.log('---------------------- Record ----------------------');
                    // console.log(record);
                    details.fightRecord = record;
                    // console.log('----------------------------------------------------');
                }
            }
            console.log('---------------------- Details ----------------------');
            console.log(details);
            console.log('----------------------------------------------------');
            return details;

        } catch(e) {
            console.log(e);
            return 'Error';
        }
    }


};
