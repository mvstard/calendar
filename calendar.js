tealiumTools.getHistory = function(date1,date2){
    dates = [];
    try{
        for (var i=0; j = arguments.length, i<j; i++){
            //not pretty - manicure input
            if (arguments[i].toLowerCase().indexOf('version') > -1){
                dates.push(arguments[i].toLowerCase().replace("version",'').trim().replace(/\./g,''))
            }
            else {
                dates.push(arguments[i].toLowerCase().replace("version",'').trim().replace(/\./g,''))
            }
        }
    }
    catch(e){
        console.log(e + "invalid version timestamp in format YYYYMMDDmmssss")
    }

    var c_history = utui.data.publish_history;
    var historyBlob = {dev: {},qa: {},prod: {}};
    if (dates.length === 2){
        let prev = dates[0]; let post = dates[1];
        for (var env in historyBlob) {
            for (var x in c_history) {
                if (c_history[x].publishState.saved >= prev && c_history[x].publishState.saved <= post) {
                    if (c_history[x].publishState[env].length > 0) {
                        historyBlob[env][x] = JSON.parse(c_history[+x][+x].history);
                    }
                }
            }
        }
    }
    return historyBlob;
}

if (tealiumTools.input && tealiumTools.input.vers1_uid && tealiumTools.input.vers1_uid) {

  tealiumTools.getHistory({html: encodeURI(tealiumTools.createExtHist(tealiumTools.input.exten_uid)) });

} else {
  tealiumTools.sendError("Error", "YOU BLEW IT");
}
