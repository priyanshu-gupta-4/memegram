const {Gmail} = require("./config/key");
const {pass} = require("./config/key");
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
function sendMail (obj,otp){
async function main() {

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
    text:"welcoming "+obj.name + " to India's largest meme sharing platform your otp is "+otp,
    html:"<strong>welcoming "+obj.name + " to India's largest meme sharing platform your otp is <h2>"+otp +"</h2></strong>"
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.co
}
main().catch(console.error);
}

module.exports = sendMail;