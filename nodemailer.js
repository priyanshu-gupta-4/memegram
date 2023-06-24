const sgMail = require('@sendgrid/mail');
// async..await is not allowed in global scope, must use a wrapper
function sendMail (obj,otp){

  sgMail.setApiKey("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")
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