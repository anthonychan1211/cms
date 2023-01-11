import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import cookie from "cookie";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const client = await clientPromise;
  const user = await client
    .db("cms-user")
    .collection("user")
    .findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  let isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return res.status(400).json({ error: "Invalid credentials" });

  const secret = process.env.JWT_SECRET as string;
  const jsToken = JWT.sign({ userEmail: user.email }, secret);
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", jsToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    })
  );

  res.status(200).json({ user });
};

export default login;
