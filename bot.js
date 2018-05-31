var request, botID, botResponse, topTiersUrl, pictures, colinFellas, oneLinerJoke, bio, coolText, email, poo

request      = require('request');
oneLinerJoke = require('one-liner-joke');
poo          = require('poo');
pictures     = require('./pictures.js');
google       = require('./google.js');
coolText     = require('./cool-text.js');
email        = require('./email.js');
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


function determineResponse(message,sender) {
  if (includes(message,"who made you") || includes(message,"creator")){
    coolText.createCoolText("Alec");
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
  else if (includes(message, "dominos")){
    sendMessage(colinFellas,"");
  }
  else if (includes(message, "poop fact") || includes(message,"poo fact")){
    sendMessage(poo.fact(),"");
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
  else if (includes(message, "google search")){
    var cleanMessage = "";
    if (includes(message,"cruz")){
      cleanMessage = message.toLowerCase().replace("ted","").replace("cruz","").replace("google","").replace("search","");
    }
    else{
      cleanMessage = message.toLowerCase().replace("ted","").replace("google","").replace("search","");
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
  else{
    var cleanMessage = "";
    if (includes(message,"cruz")){
      cleanMessage = message.toLowerCase().replace("ted","").replace("cruz","");
    }
    else{
      cleanMessage = message.toLowerCase().replace("ted","");
    }
    if (cleanMessage.trim() == "hey"){
      sendMessage("yo");
    }
    else{
      sendMessage("Not gonna lie, have no clue what to say to you right now. Sry.","");
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
