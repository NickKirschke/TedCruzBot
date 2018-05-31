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
  var sender = JSON.parse(body[body.length - 1]).name.toString();
  if (message.toLowerCase().indexOf(botName) !== -1){
    console.log(botName + " was mentioned");
    console.log(sender.toLowerCase());
    if (sender.toLowerCase() != "ted cruz"){
      bot.determineResponse(message,sender);
    }
    else{
      console.log("Sender is Ted Cruz");
    }
  }
  else{
    console.log(botName + " was not mentioned");
  }
}

port = Number(process.env.PORT || 5000);
server.listen(port);
