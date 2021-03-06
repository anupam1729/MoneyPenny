var express = require('express');
var fs = require('fs');
var moment = require('moment');
var async = require('async');
var iciciquote = require("./GetICICIQuote.js");

var app = express.createServer(express.logger());

app.get('/', function (request, response) {

    var fs = require('fs');
    fs.readFile('index.html', function (err, data) {
        if (err) throw err;
        response.send(data.toString());
    });

});


app.get('/Quote', function (request, response) {
    request.setTimeout(300000);
    response.setTimeout(300000);
            var finalCSVString = "";
            var timeNow = moment();

            var fs = require('fs');
            var symbolsArray = fs.readFileSync('futureslist.tls').toString().split("\r\n");

            async.forEach(symbolsArray,
            function (symbol, callback) {
                //console.log("!!!" + symbol);
                iciciquote.returnQuoteJSON(symbol, function (foo) {
                    finalCSVString += foo.Symbol + "," + (moment(foo.LastTradeDate, 'DD-MMM-YYYY')).format('YYYYMMDD') + "," + foo.DayOpen + "," + foo.DayHigh + "," + foo.DayLow + "," + foo.LastTradePrice + "," + foo.Volume + "," + foo.PrevDayClose + "\r\n";
                    callback();
                });
            },
             function () {
                 //var jsonString = JSON.stringify(foo);
                 //console.log("..." + finalCSVString);
                 //fs.writeFile("test.csv", finalCSVString);
                 //response.send(test.csv);
                 response.send(finalCSVString);
                 //console.log("took " + moment().diff(timeNow));
             }
            );

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});