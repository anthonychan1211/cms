import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { gmail } from "googleapis/build/src/apis/gmail";
const sendConfirmationEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const data = JSON.parse(req.body);
  const sgApiKey = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(sgApiKey!);
  const receiverEmail = data.userEmail;
  const subject = data.subject;
  const text = data.text;
  const msg = {
    to: receiverEmail,
    from: "Anthony Chan <anthonychan1211@gmail.com>",
    subject,
    text,
  };

  (async () => {
    try {
      await sgMail.send(msg);
      console.log("email sent");
      res.status(200).send(`email sent to ${receiverEmail}`);
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
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
