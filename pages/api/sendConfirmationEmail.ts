import nodemailer from "nodemailer";
import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
const sendConfirmationEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const data = JSON.parse(req.body);
  const receiverEmail = data.userEmail;
  const subject = data.subject;
  const text = data.text;
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: `Anthony Chan <${process.env.EMAIL_USER}>`,
      to: receiverEmail,
      subject,
      text,
    };
    const sendResult = await transporter.sendMail(mailOptions);
    res.status(200).json(sendResult);
    console.log("email sent");
  } catch (error) {
    console.log(error);
  }
};

export default sendConfirmationEmail;
