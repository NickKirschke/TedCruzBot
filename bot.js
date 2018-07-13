var request, botID, botResponse, topTiersUrl, pictures, colinFellas, oneLinerJoke, bio, coolText, email, poo, randomResponses, commands

request      = require('request');
oneLinerJoke = require('one-liner-joke');
poo          = require('poo');
pictures     = require('./pictures.js');
google       = require('./google.js');
coolText     = require('./cool-text.js');
email        = require('./email.js');
groupmecli   = require('./groupmecli.js');
youtube      = require('./youtube.js');
botID        = process.env.BOT_ID;
topTiersUrl  = process.env.TOP_TIERS_URL;
colinFellas  = "Hey fellas," + "\n" + "June 6th I start my new job with the Corporate side of Dominos Pizza. I'll " +
"be moving up to Ann Arbor, MI for a few months right next to the University of Michigan. If any brothers are in the area and wanted to " +
"catch dinner or grab a few beers that'd be awesome. I'd love to see some of you guys while I'm up there in a new area." + "\n" +
"ODH," + "\n" + "AN 308";
bio          = "Born on December 22, 1970, I grew up in Houston, Texas, earning my bachelor's at" +
"Princeton University and going on to Harvard Law School. Working as an attorney for some time, I later served as an adviser on the 2000" +
"presidential campaign of George W. Bush. In 2012 I won election to the U.S. Senate with the support of the Tea Party and took office the" +
"following year, going on to orchestrate a governmental shutdown in opposition to Obamacare. In 2015, I announced that I was running for"  +
"the 2016 Republican presidential nomination."
randomResponses    = ["Not gonna lie, have no clue what to say to you right now. Sry.","Can't talk right now, too busy getin money","lol","Idk what to say so haha",
"Why don't you try googling it","I'm Ted Cruz and I approve that message","Yeah you and what army","Warriors in 5","Shhhhhh","I don't care","ok"];
commands = "Here are the following commands you can use with me: \n top tiers \n puppy pic \n meme \n gif \n youtube \n" +
"dominos \n roll dice \n poo fact \n joke \n who are/made you \n who am i \n learn \n say \n like & dislike \n google \n cool text \n and other hidden commands";


function determineResponse(message,sender,messageId) {
  if (includes(message,"who made you") || includes(message,"creator")){
    coolText.createCoolText("Alec");
  }
  else if (includes(message, "searchpics")){
    var cleanMessage = message.toLowerCase().replace("ted","").replace("cruz","").replace("searchpics","");
    pictures.getImage(cleanMessage.trim());
  }
  else if (includes(message, "top tiers")){
    sendMessage("The fellas",topTiersUrl);
  }
  else if (includes(message, "puppy pic")){
    pictures.getPuppyPicture();
  }
  else if (includes(message, "meme")){
    pictures.getMeme();
  }
  else if (includes(message, "gif")){
    pictures.getGif();
  }
  else if (includes(message,"youtube")){
    var cleanMessage = message.toLowerCase().replace("ted","").replace("cruz","").replace("youtube","");
    youtube.searchYoutube(cleanMessage.trim());
  }
  else if (includes(message, "happy birthday")){
    var splitMessage = message.split(" ");
    for (i = 0; i < splitMessage.length; i++){
      if (splitMessage[i] == "happy"){
        var name = "";
        if (i != 0){
          name = splitMessage[i - 1];
        }
        else{
          name = splitMessage[i + 2];
        }
        pictures.getBirthday(name);
      }
    }
  }
  else if (includes(message, "dominos")){
    sendMessage(colinFellas,"");
  }
  else if (includes(message, "bryan")){
    sendMessage("Bryan is a rapist","");
  }
  else if (includes(message,"s up")){
    sendMessage("nm wbu","");
  }
  else if (includes(message,"roll dice")){
    var randomNum = Math.floor(Math.random() * 6) + 1
    sendMessage(randomNum.toString() + " is your number","");
  }
  else if (includes(message, "poop fact") || includes(message,"poo fact")){
    sendMessage(poo.fact(),"");
  }
  else if (includes(message,"love")){
    sendMessage("i love u 2....sike","");
  }
  else if (includes(message, "joke")){
    var randomJoke = oneLinerJoke.getRandomJoke();
    sendMessage(randomJoke["body"],"");
  }
  else if (includes(message, "who are you")){
    sendMessage(bio,"");
  }
  else if (includes(message,"who am i")){
    sendMessage("You are " + sender + " idiot");
  }
  else if (includes(message,"learn")){
    email.sendEmail(message);
  }
  else if (includes(message,"say")){
    var cleanMessage = ""
    if (includes(message,"cruz")){
      cleanMessage = message.toLowerCase().replace("ted","").replace("cruz","").replace("google","say");
    }
    else{
      cleanMessage = message.toLowerCase().replace("ted","").replace("say","");
    }
    sendMessage(cleanMessage,"");
  }
  else if (includes(message,"dislike")){
    groupmecli.likeMessages(messageId,"dislike");
  }
  else if (includes(message,"like")){
    groupmecli.likeMessages(messageId,"like");
  }
  else if (includes(message, "commands")){
    sendMessage(commands,"");
  }
  else if (includes(message,"mom") || includes(message,"dad")){
    if (includes(message,"mom")){
      sendMessage("me and your mom are good friends :)","");
    }
    else{
      sendMessage("I\'m your daddy","");
    }
  }
  else if (includes(message, "google")){
    var cleanMessage = "";
    if (includes(message,"cruz")){
      cleanMessage = message.toLowerCase().replace("ted","").replace("cruz","").replace("google","");
    }
    else{
      cleanMessage = message.toLowerCase().replace("ted","").replace("google","");
    }
    google.getSearchResults(cleanMessage);
  }
  else if (includes(message, "cool text")){
    var cleanMessage = "";
    if (includes(message,"cruz")){
      cleanMessage = message.toLowerCase().replace("ted","").replace("cruz","").replace("cool","").replace("text","");
    }
    else{
      cleanMessage = message.toLowerCase().replace("ted","").replace("cool","").replace("text","");
    }
    coolText.createCoolText(cleanMessage.trim());
  }
  else if (includes(message,"?")){
    sendMessage("Why are you asking me that","");
  }
  else{
    var cleanMessage = "";
    if (includes(message,"cruz")){
      cleanMessage = message.toLowerCase().replace("ted","").replace("cruz","");
    }
    else{
      cleanMessage = message.toLowerCase().replace("ted","");
    }
    if (cleanMessage.trim() == "hey" || cleanMessage.trim() == "hi" || cleanMessage.trim() == "yo"){
      sendMessage("yo");
    }
    else{
      var randomNum = Math.floor(Math.random() * randomResponses.length + 2);
      if (sender == "Uncle B"){
        sendMessage("idk but you\'re Uncle B");
      }
      else if (randomNum == randomResponses.length + 1){
        sendMessage(colinFellas,"");
      }
      else if (randomNum == randomResponses.length + 2){
        pictures.getPuppyPicture();
      }
      else{
        sendMessage(randomResponses[randomNum],"");
      }
    }
  }
}

function sendMessage(message,pictureUrl) {
  var base_url = "https://api.groupme.com/v3/bots/post"
  var body;
  if (pictureUrl != ""){
    console.log(pictureUrl)
    body = {
      "bot_id" : botID,
      "text" : message,
      "attachments" : [
        {
          "type"  : "image",
          "url"   : pictureUrl
        }
      ]
    };
  }
  else{
    body = {
      "bot_id" : botID,
      "text" : message
    };
  }
  request.post({
    url: base_url,
    body: JSON.stringify(body)
  }, function(error, response, body){
    if (!error){
      console.log("Message was sent successfully");
    }
    else{
      console.log(console.error());
    }
  });

}

function includes(theString,substring){
  return theString.toLowerCase().indexOf(substring.toLowerCase()) !== -1
}

exports.determineResponse = determineResponse;
exports.sendMessage = sendMessage;
exports.includes = includes;
