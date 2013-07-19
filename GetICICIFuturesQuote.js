var request = require('request');
var jsdom = require('jsdom');

module.exports.returnQuoteJSON = function (symbol, expiryDate, cb) {
//if (symbol == null ) symbol = "HCLTEC";
//if (expiryDate == null) expiryDate = "25-Jul-2013";

//For futures: https://secure.icicidirect.com/NewSiteTrading/trading/fno/Includes/GetQuote.asp?FFO_UNDRLYNG=ASIPAI&FFO_XCHNG_CD=NFO&FFO_PRDCT_TYP=F&FFO_OPT_TYP=*&FFO_EXPRY_DT=25-Jul-2013&FFO_EXER_TYP=E&FFO_RQST_TYP=*&FFO_STRK_PRC=0
var url = "https://secure.icicidirect.com/NewSiteTrading/trading/fno/Includes/GetQuote.asp?FFO_UNDRLYNG=" + symbol + "&FFO_XCHNG_CD=NFO&FFO_PRDCT_TYP=F&FFO_OPT_TYP=*&FFO_EXPRY_DT=" + expiryDate + "&FFO_EXER_TYP=E&FFO_RQST_TYP=*&FFO_STRK_PRC=0";
jsdom.env(url, function (Err, window) {

    var projectionNode = window.document.getElementsByClassName('projection')[1];
    var lastTradeDate_NSE = projectionNode.getElementsByTagName('tr')[2].getElementsByTagName('td')[2].innerHTML.replace(/&nbsp;/g, "").replace(/,/g,"").trim();
    var lastTradeTime_NSE = projectionNode.getElementsByTagName('tr')[2].getElementsByTagName('td')[5].innerHTML.replace(/&nbsp;/g, "").replace(/,/g,"");
    projectionNode = window.document.getElementsByClassName('projection')[2];
    var lastTradePrice_NSE = projectionNode.getElementsByTagName('tr')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML.replace(/&nbsp;/g, "").replace(/,/g, "");
    var bestBidPrice_NSE = projectionNode.getElementsByTagName('tr')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[3].innerHTML.replace(/&nbsp;/g, "").replace(/\r/g, "").replace(/\n/g, "").replace(/\t/g, "").split('<')[0].trim().replace(/,/g, "");
    var dayOpen_NSE = projectionNode.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML.replace(/&nbsp;/g, "").replace(/,/g, "");
    var bestOfferPrice_NSE = projectionNode.getElementsByTagName('tr')[2].getElementsByTagName('td')[3].innerHTML.replace(/&nbsp;/g, "").replace(/,/g, "");
    var dayHigh_NSE = projectionNode.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerHTML.replace(/&nbsp;/g, "").replace(/,/g, "");
    var bestBidQty_NSE = projectionNode.getElementsByTagName('tr')[3].getElementsByTagName('td')[3].innerHTML.replace(/&nbsp;/g, "").replace(/,/g, "");
    var dayLow_NSE = projectionNode.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].innerHTML.replace(/&nbsp;/g, "").replace(/,/g, "");
    var bestOfferQty_NSE = projectionNode.getElementsByTagName('tr')[4].getElementsByTagName('td')[3].innerHTML.replace(/&nbsp;/g, "").replace(/,/g, "");
    var prevDayClose_NSE = projectionNode.getElementsByTagName('tr')[5].getElementsByTagName('td')[1].innerHTML.replace(/&nbsp;/g, "").replace(/,/g, "");
    var change_NSE = ''; // projectionNode.getElementsByTagName('tr')[6].getElementsByTagName('td')[1].innerHTML;
    var volume_NSE = projectionNode.getElementsByTagName('tr')[7].getElementsByTagName('td')[1].innerHTML.replace(/&nbsp;/g, "").replace(/,/g, "");
    var changePercent_NSE = projectionNode.getElementsByTagName('tr')[6].getElementsByTagName('td')[1].innerHTML.replace(/&nbsp;/g, "").replace(/,/g, "");

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

    })

}
