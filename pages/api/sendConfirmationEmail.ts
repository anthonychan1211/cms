import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { gmail } from "googleapis/build/src/apis/gmail";

const sendConfirmationEmail = async (
  userEmail: string,
  subject: string,
  text: string
) => {
  // *******************************SendGrid
  const sgApiKey = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(sgApiKey!);
  const msg = {
    to: userEmail,
    from: `Anthony Chan <${process.env.SENDER_EMAIL}>`,
    subject,
    text,
  };

  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();

  // ************nodemailer
  //   const oAuth2Client = new google.auth.OAuth2(
  //     process.env.CLIENT_ID,
  //     process.env.CLIENT_SECRET,
  //     process.env.REDIRECT_URI
  //   );
  //   oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  //   try {
  //     const accessToken = await oAuth2Client.getAccessToken();
  //     const transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         type: "OAuth2",
  //         user: process.env.EMAIL_USER,
  //         clientId: process.env.CLIENT_ID,
  //         clientSecret: process.env.CLIENT_SECRET,
  //         refreshToken: process.env.REFRESH_TOKEN,
  //         accessToken,
  //       },
  //     });

  //     const mailOptions = {
  //       from: `Anthony Chan <${process.env.EMAIL_USER}>`,
  //       to: receiverEmail,
  //       subject,
  //       text,
  //     };
  //     const sendResult = await transporter.sendMail(mailOptions);
  //     res.status(200).json(sendResult);
  //     console.log("email sent");
  //   } catch (error) {
  //     console.log(error);
  //   }
};

export default sendConfirmationEmail;
