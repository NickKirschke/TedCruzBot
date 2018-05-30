var http, router, director, server, port, body, bot, botID;

request     = require('request');
http        = require('http');
director    = require('director');
body        = [];
bot         = require('./bot.js');
botName     = "ted";

router = new director.http.Router({
  '/' : {
    post: parseBody
  }
});

server = http.createServer(function (req, res) {
  req.on('data', function (chunk) {
    body.push(chunk.toString());
    parseBody();
  });
});

function parseBody() {
  var message = JSON.parse(body[body.length - 1]).text.toString();
  if (message.toLowerCase().indexOf(botName) !== -1){
    console.log(botName + " was mentioned");
    bot.determineResponse(message);
  }
  else{
    console.log(botName + " was not mentioned");
  }
}

port = Number(process.env.PORT || 5000);
server.listen(port);
