var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;

var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";


var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

emailCampaigns.name = "Campaign sent via the API";
emailCampaigns.subject = "My subject";
emailCampaigns.sender = {
  name: "denisdaniv1test@gmail.com",
  email: "denisdaniv1@gmail.com",
};
emailCampaigns.type = "classic";
emailCampaigns.htmlContent =
  "Congratulations! You successfully sent this example campaign via the Brevo API.";
// emailCampaigns.recipients = { listIds: [2, 7] };
// emailCampaigns.scheduledAt = "2018-01-01 00:00:01";

apiInstance.createEmailCampaign(emailCampaigns).then(
  function (data) {
    console.log("API called successfully. Returned data: " + data);
  },
  function (error) {
    console.error(error);
  }
);

// const nodemailer = require("nodemailer");

// const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: SMTP_HOST,
//   port: SMTP_PORT,
//   secure: false,
//   auth: {
//     user: SMTP_USER,
//     pass: SMTP_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const sendEmail = async (data) => {
//   await transport.sendMail({
//     ...data,
//     from: SMTP_USER,
//   });
// };

// module.exports = sendEmail;

// const nodemailer = require("nodemailer");

// class MailService {
//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });
//   }

//   async sendActivationMail(to, link) {
//     await this.transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to,
//       subject: "Активация аккаунта на " + process.env.API_URL,
//       text: "",
//       html: `
//                     <div>
//                         <h1>To activate the component using the link</h1>
//                         <a href="${link}">${link}</a>
//                     </div>
//                 `,
//     });
//   }
// }

// module.exports = new MailService();
