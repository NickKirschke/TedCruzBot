var google, bot

google   = require('google');
bot      = require('./bot.js');

function getSearchResults(searchText){
  google.resultsPerPage = 5;
  var nextCounter = 0;

  google(searchText, function(err, res){
    if (!err){
      var stringMessage = "TOP 5 RESULTS for " + "\'" + searchText.trim() + "\'" + "\n";
      for (var i = 0; i < 5; i++) {
        var link = res.links[i];
        stringMessage += (i + 1).toString() +") " + link.title + " :: " + link.href + "\n";
      }
      bot.sendMessage(stringMessage,"");
    }
    else{
      console.log(err);
    }
  });
}

exports.getSearchResults = getSearchResults;
