import sgMail from "@sendgrid/mail";
import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
/**
 *
 * @param req - The verify token contains email, project name, token. Also pass in the purpose of whether 'changepassword' or 'register'
 * @param res - send `{success: `Email has sent to ${email}. Please verify.` 
    }
 * This function sends the url for verification and create a new document in token collection.
 */
const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const { email, project, token, purpose } = req.body;
  const tokenCollection = client.db("cms-user").collection("token");
  await tokenCollection.insertOne(req.body);

  // sending email function
  const url = `${process.env.BASE_URI}emailverifyingpage/?purpose=${purpose}&email=${email}&projectName=${project}&token=${token}`;
  const sgApiKey = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(sgApiKey!);

  try {
    await sgMail.send({
      to: email,
      from: `Anthony Chan <${process.env.SENDER_EMAIL}>`,
      subject: "Verify your email",
      text: `Please verify your email by clicking the following link:
        ${url}`,
    });
    return res.status(200).json({
      success: `Email has sent to 
    ${email}. 
    Please verify.`,
    });
  } catch (error: any) {
    console.error(error);

    if (error.response) {
      res.status(400).send(error.response.body);
    }
  }
};

export default sendEmail;
