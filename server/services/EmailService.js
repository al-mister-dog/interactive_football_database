const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        process.env.SENDGRID_KEY,
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
      <a href="${host}/#/login?token=${token}">Activate</a>
    </div>
    `,
  });
  console.log("sent");
}