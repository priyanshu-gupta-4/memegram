const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")
const msg = {
  to: 'guptapriyanshuboy@gmail.com', // Change to your recipient
  from: 'samyak.jain.e21@nsut.ac.in', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })