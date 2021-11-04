const db = require("../utils/database");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.sendAccountActivation = async (email, token) => {
  await transporter.sendMail({
    from: "alexhunter@live.co.uk",
    to: email,
    subject: "Account Activation",
    html: `
    <div>
      <b>Please click below link to activate your account</b>
    </div>
    <div>
      <a href="http://localhost:4000/#/login?token=${token}">Activate</a>
    </div>
    `,
  });
  console.log("sent");
}