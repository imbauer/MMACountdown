module.exports =
{
    processFighter: function (body)  {
        body = body.replace(/<[^>]*>/g,'').replace(/\\n/g,'').replace(/\s\s+/g, ' ');
        var eventParsing = /(?=Background)|(?=Mixed martial arts record)|(?:{\"batchcomplete.*?title)/g;
        var mmaRecordParsing = /(?=MMA record start)|(?=\{\{end\}\})/g;
        var mmaRecordFightsParsing = /(?=\}\}Draw)|(?=\}\}Win)|(?=\}\}Loss)/g;
        var info = body.split(eventParsing);
        info = info.filter(function(e){return e});
        info[1] = info[1].split(mmaRecordParsing);
        console.log('----------------------------Start of body-------------------------');
        for (var i = 0; i < info.length; i++) {
            if (i === 1) {
                for (var j = 0; j < info[i].length; j++) {
                    if (j === 1) {
                        info[i][j] = info[i][j].replace(/(\|align.*?\|)/g, '');
                        info[i][j] = info[i][j].split(mmaRecordFightsParsing);
                        for (var k = 0; k < info[i][j].length; k++) {

                            info[i][j][k] = info[i][j][k].replace(/(\|align.*?\|)|(\{)|(\})|(\[)|(\])|(?:\(fighter\).*?\|.*?(?=\|))|(?:\(grappler\).*?\|.*?(?=\|))|(\|\-\|)/g, '').split('|');

                            info[i][j][k].length = 9;
                            if (k === 0) {
                                info[i][j][k].length = 1;
                            }

                            var removeValFromIndex = [4, 7]; // ascending
                            removeValFromIndex.reverse().forEach(function(index) {
                              info[i][j][k].splice(index, 1);
                            });

                        }
                        console.log(info[i][j]);
                        console.log();
                    }
                }
                // console.log(info[i]);
                // console.log();
            }
        }
        console.log('----------------------------End of body-------------------------');

    }

};
