import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import crypto from "crypto";
import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail";
import { sendEmailHelper } from "../../util/sendEmailHelper";

async function signUp(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const { userName, projectName, email, password } = req.body;

  // check if the email address has been registered or project name is taken
  const userCollection = client.db("cms-user").collection("user");
  if (await userCollection.findOne({ email: email.toLowerCase() })) {
    return res.status(400).send("This email has been registered");
  } else if (
    await userCollection.findOne({ projectName: projectName.toLowerCase() })
  ) {
    return res.status(400).send("This project name is already taken");
  }
  const newUser = {
    userName: userName.toLowerCase(),
    projectName,
    email,
    password: await bcrypt.hash(password, 10), // hash the password and save to db
    verified: false,
  };

  await userCollection.insertOne(newUser);
  const emailVerificationToken = {
    email: newUser.email,
    project: newUser.projectName,
    token: crypto.randomBytes(32).toString("hex"),
    purpose: "register",
  };
  const emailSent = await sendEmailHelper(emailVerificationToken, "register");
  if (emailSent.status === 400)
    return res.status(400).json({ error: "couldn't sign up" });
  res.status(200).json(emailSent);
}

export default signUp;
