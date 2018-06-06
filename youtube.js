var Youtube, youtube, bot

Youtube = require('youtube-node');
youtube = new Youtube();
bot     = require('./bot.js');
baseUrl = "https://www.youtube.com/watch?v="
youtube.setKey(process.env.YOUTUBE_API_KEY);

function searchYoutube(text){
  youtube.search(text,1,function(error, result) {
    if (error){
      console.error(error);
    }
    else{
      var videoID = result.items[0].id.videoId;
      bot.sendMessage(baseUrl + videoID,"");
      bot.sendMessage("Top Result for YouTubing \'" + text + "\'");
    }
  });
}

exports.searchYoutube = searchYoutube;
