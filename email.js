var bot, nodemailer, user, pass

nodemailer    = require('nodemailer');
bot           = require('./bot.js');
userName          = process.env.USER;
password          = process.env.PASS;

function sendEmail(message){
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: userName,
    pass: password
  }
});

var mailOptions = {
  from: userName,
  to: userName,
  subject: 'Email from Ted Cruz bot',
  text: message
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    bot.sendMessage("Got it, I will let Alec know so he can teach me");
  }
});
}

exports.sendEmail = sendEmail;
