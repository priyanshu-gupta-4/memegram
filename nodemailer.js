const {Gmail} = require("./config/key");
const {pass} = require("./config/key");
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
function sendMail (obj){
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: Gmail,
      pass: pass,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from:'"memogram " <memogram@gmail.com>',
    to:obj.email,
    subject:"sign up success",
    text:"welcome to India's largest meme sharing platform"
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
main().catch(console.error);
}

module.exports = sendMail;