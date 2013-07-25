var iciciquote = require("./GetICICIQuote.js");
var fs = require('fs');
var async = require('async');
var moment = require('moment');

var finalCSVString ="";
var timeNow = moment();
//var symbol = process.argv[2];
//var expiryDate = process.argv[3];
//if (symbol == null) symbol = "HCLTEC";
//if (expiryDate == null) expiryDate = "25-Jul-2013";

var fs = require('fs');
var symbolsArray = fs.readFileSync('futureslist.tls').toString().split("\r\n");

async.forEach(symbolsArray,
    function (symbol, callback) {
        //console.log("!!!" + symbol);
        iciciquote.returnQuoteJSON(symbol, function (foo) {
            if (foo != null) {
                finalCSVString += foo.Symbol + "," + (moment(foo.LastTradeDate, 'DD-MMM-YYYY')).format('YYYYMMDD') + "," + foo.DayOpen + "," + foo.DayHigh + "," + foo.DayLow + "," + foo.LastTradePrice + "," + foo.Volume + "," + foo.PrevDayClose + "\r\n";
            }
            callback();
        });
    },
     function () {
         console.log("..." + finalCSVString);
         fs.writeFile("test.csv", finalCSVString);
         console.log("took " + moment().diff(timeNow));
     }
);

