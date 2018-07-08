var fs, imageDownload, imageType, randomPuppy, randomString, puppyFileName, ImageService, topTiersUrl, bot, dankmemes, GiphyRandom, giphyRandom, gis, personName

fs = require('fs');
imageDownload  = require('image-download');
imageType      = require('image-type');
randomPuppy    = require('random-puppy');
randomString   = require("randomstring");
ImageService   = require('groupme').ImageService;
dankmemes      = require('dankmemes');
GiphyRandom    = require('giphy-random');
gis            = require('g-i-s');
giphyRandom    = new GiphyRandom({ apiKey: process.env.API_KEY });
bot            = require('./bot.js');
topTiersUrl    = process.env.TOP_TIERS_URL;
personName     = "";


function getPuppyPicture(){
  randomPuppy()
    .then(url => {
      console.log("Puppy url " + url);
      downloadImage(url, "puppy");
    });
}

function getMeme(){
  dankmemes('hour',25,function(error, data) {
    if (!error){
      var randomNum = Math.floor(Math.random() * 25) + 1
      var url = data[randomNum.toString()];
      downloadImage(url, "meme");
    }
    else{
      console.error(error);
    }
  });
}

function getGif(){
  giphyRandom.get({ rating: 'R' })
    .then(data => bot.sendMessage(data.url,""))
    .catch(e => console.error(e.message));
}

function getBirthday(name){
  personName = name;
  bot.sendMessage("Hey " + personName + ", just wanted to wish you a happy birthday. Here are some birthday pics. Enjoy :)");
  gis(name + ' happy birthday', birthdayResult);
}

function birthdayResult(error, results){
  if (error){
    console.log(error);
  }
  else{
    for (i = 0; i <= 8; i++){
      downloadImage(results[i].url,"image");
    }
  }
}

function downloadImage(url, typePic){
  imageDownload(url)
    .then(buffer => {
      if (buffer != null){
        var type = imageType(buffer);
        var fileName = randomString.generate() + "." + type.ext;
        fs.writeFile(fileName, buffer, (err) => {
          if (!err){
            console.log("Wrote " + fileName + " successfully");
            if (typePic == "puppy"){
              postPictureToImageService(fileName,"puppy");
            }
            else if (typePic == "meme"){
              postPictureToImageService(fileName,"meme");
            }
            else if (typePic == "image"){
              postPictureToImageService(fileName,"image");
            }
            else{
              console.log("Type not specified");
            }
          }
          else{
            console.log(err);
          }
        });
      }
      else{
        console.log("Error downloading image");
      }
    })
}

function postPictureToImageService(fileName,type){
  ImageService.post(fileName,function(error, res){
    if (!error){
      if (fileName != topTiersUrl){
        fs.unlink(fileName, (err) => {
          if (err) throw err;
          console.log(fileName + ' was deleted');
        });
      }
      if (type == "puppy"){
        bot.sendMessage("Here's a cute lil pup",res.picture_url);
      }
      else if (type == "meme"){
        bot.sendMessage("Here's a random meme",res.picture_url);
      }
      else if(type == "image"){
        bot.sendMessage("", res.picture_url);
      }
      else{
        console.log("Type not specified");
      }
    }
    else{
      console.log(error);
    }
  });
}

exports.getPuppyPicture = getPuppyPicture;
exports.getMeme = getMeme;
exports.getGif = getGif;
exports.getBirthday = getBirthday;
