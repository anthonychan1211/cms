import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendConfirmationEmail from "./sendConfirmationEmail";
import sgMail from "@sendgrid/mail";

async function signUp(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const newUser = {
    userName: req.body.userName.toLowerCase(),
    projectName: req.body.projectName.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    verified: false,
  };
  const secret = process.env.JWT_SECRET as string;
  const db = client.db("cms-user");
  // check if the email has been registered or project name is taken
  const userCollection = db.collection("user");
  const isRegister = await userCollection.findOne({
    email: newUser.email,
  });
  if (isRegister != null) {
    return res.status(400).send("This email has been registered");
  } else if (
    await userCollection.findOne({ projectName: newUser.projectName })
  ) {
    return res.status(400).send("This project name is already taken");
  }
  // hash the password and save to db
  else {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    await userCollection.insertOne(newUser);
    const emailVerificationToken = {
      userEmail: newUser.email,
      token: crypto.randomBytes(32).toString("hex"),
    };
    const tokenCollection = db.collection("token");
    await tokenCollection.insertOne(emailVerificationToken);
    // sending email function
    const url = `${process.env.BASE_URI}/?userId=${emailVerificationToken.userEmail}&token=${emailVerificationToken.token}`;
    // *******************************SendGrid
    const sgApiKey = process.env.SENDGRID_API_KEY;
    sgMail.setApiKey(sgApiKey!);

    try {
      await sgMail.send({
        to: newUser.email,
        from: `Anthony Chan <${process.env.SENDER_EMAIL}>`,
        subject: "Verify your email",
        text: `Please verify your email by clicking the following link:
        ${url}`,
      });
      res.status(200).send(`Email has sent to 
    ${newUser.email}. 
    Please verify.`);
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        res.status(400).send(error.response.body);
      }
    }

    // if (!!result) {
    //   res.send(message);
    // } else if (confirmationEmailRes.status >= 400) {
    //   res.status(400).send("Something is wrong");
    // }
  }
}

export default signUp;
