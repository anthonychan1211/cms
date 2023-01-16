import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
const getUserByEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email;
  console.log(email);
  const client = await clientPromise;
  const user = await client
    .db("cms-user")
    .collection("user")
    .findOne({ email });
  user
    ? res.status(200).json(user)
    : res.status(400).json({ error: "This email is not registered" });
};

export default getUserByEmail;
