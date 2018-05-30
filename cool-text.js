var figlet, bot

figlet   = require('figlet');
bot      = require('./bot.js');

function createCoolText(text){
  figlet(text, function(err, data) {
    if (!err){
      if (text != "Alec"){
        var messageString = data + "\n" + text
        bot.sendMessage(messageString,"");
      }
      else{
        var messageString = data + "\n" + "Alec was my creator. He's a good guy";
        bot.sendMessage(messageString,"");
      }
    }
    else{
      console.log(err);
    }
  })
}

exports.createCoolText = createCoolText;
