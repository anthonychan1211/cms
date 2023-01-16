import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import crypto from "crypto";
import bcrypt from "bcrypt";

import sgMail from "@sendgrid/mail";
import { sendEmailHelper } from "../../util/sendEmailHelper";

const forgetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const { email, password } = req.body;
  // const user = await checkUserExist(email);
  const user = await client
    .db("cms-user")
    .collection("user")
    .findOne({ email });
  if (!user) {
    res.status(400).send("This email is not registered");
  } else if (user.verified === false) {
    res.status(400).send("This email is not verified");
  } else {
    const emailVerificationToken = {
      purpose: "changepassword",
      email,
      projectName: user.projectName,
      token: crypto.randomBytes(32).toString("hex"),
    };
    const hashed = await bcrypt.hash(password, 10);
    await client
      .db("cms-user")
      .collection("user")
      .updateOne({ email }, { $set: { unverifiedNewPassword: hashed } });
    const tokenCollection = client.db("cms-user").collection("token");
    await tokenCollection.insertOne(emailVerificationToken);
    const emailSent = await sendEmailHelper(
      emailVerificationToken,
      "changepassword"
    );
    if (emailSent.status === 400)
      return res
        .status(400)
        .json({ error: "something went wrong on sending email" });
    res.status(200).json(emailSent);
  }
};

export default forgetPassword;
