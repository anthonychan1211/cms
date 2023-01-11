import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";
import crypto from "crypto";
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
  const db = client.db("cms-user");
  // check if the email has been registered or project name is taken
  const userCollection = db.collection("user");
  if (await userCollection.findOne({ email: newUser.email })) {
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
      userName: newUser.userName,
      userEmail: newUser.email,
      project: newUser.projectName,
      token: crypto.randomBytes(32).toString("hex"),
    };
    const tokenCollection = db.collection("token");
    await tokenCollection.insertOne(emailVerificationToken);
    // sending email function
    const url = `${process.env.BASE_URI}/emailverifyingpage/?userId=${emailVerificationToken.userEmail}&projectName=${emailVerificationToken.project}&token=${emailVerificationToken.token}`;
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
  }
}

export default signUp;
