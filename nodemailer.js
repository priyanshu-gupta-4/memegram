const sgMail = require('@sendgrid/mail');
const {sendgridKey} = require("./config/key")
// async..await is not allowed in global scope, must use a wrapper
function sendMail (obj,otp){

  sgMail.setApiKey(sendgridKey)
  const msg = {
    to: obj.email, // Change to your recipient
    from: 'samyak.jain.e21@nsut.ac.in', // Change to your verified sender
    subject: 'Welcome to memegram ' + obj.name,
    text: 'welcome to worlds largest meme creating and sharing platform otp for user verification is : ' + otp,
    html: '<strong>welcome to worlds largest meme creating and sharing platform otp for user verification is : '+otp+'</strong>',
  }
  console.log(msg);
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })


}

module.exports = sendMail