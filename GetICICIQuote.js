var request = require('request');
var jsdom = require('jsdom');
var moment = require('moment');

module.exports.returnQuoteJSON = function (symbol, cb) {
    //if (symbol == null) symbol = "HCLTEC";
    var url = "http://getquote.icicidirect.com/NewSiteTrading/trading/equity/includes/trading_stock_quote.asp?Symbol=" + symbol;
    jsdom.env(url, function (Err, window) {
        console.log(symbol);
        //console.log(moment());
        if (window == null || window.document == null) {
                cb(null); 
                return;
            }
        var projectionNode = window.document.getElementsByClassName('projection')[1];
        if (projectionNode == null) {
                cb(null); 
                return;
            }

        var lastTradePrice_NSE = projectionNode.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML.replace(/,/g, "");
        var lastTradeDate_NSE = projectionNode.getElementsByTagName('tr')[1].getElementsByTagName('td')[4].innerHTML.replace(/,/g, "");
        var lastTradeTime_NSE = projectionNode.getElementsByTagName('tr')[2].getElementsByTagName('td')[4].innerHTML.replace(/,/g, "");
        var dayOpen_NSE = projectionNode.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerHTML.replace(/,/g, "");
        var dayHigh_NSE = projectionNode.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].innerHTML.replace(/,/g, "");
        var dayLow_NSE = projectionNode.getElementsByTagName('tr')[5].getElementsByTagName('td')[1].innerHTML.replace(/,/g, "");
        var prevDayClose_NSE = projectionNode.getElementsByTagName('tr')[6].getElementsByTagName('td')[1].innerHTML.replace(/,/g, "");
        var change_NSE = projectionNode.getElementsByTagName('tr')[7].getElementsByTagName('td')[1].innerHTML.replace(/,/g, "");
        var changePercent_NSE = projectionNode.getElementsByTagName('tr')[8].getElementsByTagName('td')[1].innerHTML.replace(/,/g, "");
        var volume_NSE = projectionNode.getElementsByTagName('tr')[10].getElementsByTagName('td')[1].innerHTML.replace(/,/g, "");
        var bestBidPrice_NSE = projectionNode.getElementsByTagName('tr')[3].getElementsByTagName('td')[4].innerHTML.replace(/,/g, "");
        var bestOfferPrice_NSE = projectionNode.getElementsByTagName('tr')[4].getElementsByTagName('td')[4].innerHTML.replace(/,/g, "");
        var bestBidQty_NSE = projectionNode.getElementsByTagName('tr')[5].getElementsByTagName('td')[4].innerHTML.replace(/,/g, "");
        var bestOfferQty_NSE = projectionNode.getElementsByTagName('tr')[6].getElementsByTagName('td')[4].innerHTML.replace(/,/g, "");

        var foo = {};
        foo.Symbol = symbol;
        foo.LastTradePrice = lastTradePrice_NSE;
        foo.LastTradeDate = lastTradeDate_NSE;
        foo.LastTradeTime = lastTradeTime_NSE;
        foo.DayOpen = dayOpen_NSE;
        foo.DayHigh = dayHigh_NSE;
        foo.DayLow = dayLow_NSE;
        foo.PrevDayClose = prevDayClose_NSE;
        foo.Change = change_NSE;
        foo.ChangePercent = changePercent_NSE;
        foo.Volume = volume_NSE;
        foo.BestBidPrice = bestBidPrice_NSE;
        foo.BestOfferPrice = bestOfferPrice_NSE;
        foo.BestBidQty = bestBidQty_NSE;
        foo.BestOfferQty = bestOfferQty_NSE;

        window.close();
        cb(foo);
        //console.log(moment());

    })

}
