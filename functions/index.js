const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

exports.sendEmail = functions.https.onRequest((req, res) => {
  const smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: functions.config().gmail.user,
      pass: functions.config().gmail.pass
    }
  });
  const mailOpts = {
    from: "",
    to: functions.config().gmail.user,
    subject: "From portfolio site contact form",
    text: `Name: ${req.body.name} \n
          Company: ${req.body.company} \n
          Email: ${req.body.email} \n
          ${req.body.message}`
  }
  smtpTrans.sendMail(mailOpts, (err, response) => {
    if (err) {
      console.error(err);
      res.send("Server Error. Please try again or send email to mattpickle@mattpickle.net");
    } else {
      res.send("Message sent successfully.");
    }
  })
})