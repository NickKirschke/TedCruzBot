var API, accessToken, botID, groupID, messageArray

API = require('groupme').Stateless;
request      = require('request');
accessToken = process.env.ACCESS_TOKEN;
botID        = process.env.BOT_ID;
groupID      = process.env.GROUP_ID;
messageArray = []

function likeMessages(messageId,type){
  var base_url = "https://api.groupme.com/v3/groups/" + groupID + "/messages?token=" + accessToken;
  request.get({
    url: base_url
  }, function(error, res){
    if (!error){
      jsonRes = JSON.parse(res.body);
      for (i = 0; i < 11; i++){
        messageId = jsonRes.response.messages[i].id;
        if (type == "like"){
          API.Likes.create(accessToken, groupID, messageId, function(error, res) {
            if (error){
              console.log(error);
            }
          });
        }
        else{
          API.Likes.destroy(accessToken, groupID, messageId, function(error, res) {
            if (error){
              console.log(error);
            }
          });
        }
      }
    }
    else{
      console.log(console.error());
    }
  });
}

exports.likeMessages = likeMessages;
