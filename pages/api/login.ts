import { ClientRequest } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  console.log(email);
  const client = await clientPromise;
  const user = await client
    .db("cms-user")
    .collection("user")
    .find({ email })
    .toArray();
  console.log(user.length);
  if (user.length === 0)
    return res.status(400).json({ error: "Invalid credentials" });

  let isPasswordCorrect = await bcrypt.compare(password, user[0].password);
  if (!isPasswordCorrect)
    return res.status(400).json({ error: "Invalid credentials" });

  const secret = process.env.JWT_SECRET as string;
  const jsToken = JWT.sign({ userEmail: user[0].email }, secret);
  res.json({ user: jsToken });
};

export default login;
