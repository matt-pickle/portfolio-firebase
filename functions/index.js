const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const axios = require("axios");

exports.sendEmail = functions.https.onRequest((req, res) => {
  const recaptchaResponse = req.body["g-recaptcha-response"];
  const secret = functions.config().recaptcha.secret;
  axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaResponse}`)
  .then(response => {
    if (response.data.success == true) {
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
        }
        res.end();
      });
    }
  })
  .catch(error => {
    console.error(error);
  });
});