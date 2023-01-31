import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";
const checkPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userDB, currentPassword } = req.body;
  console.log(userDB, "userDB");
  console.log(currentPassword, "ps");
  const client = await clientPromise;
  const user = await client
    .db("cms-user")
    .collection("user")
    .findOne({ projectName: userDB });
  if (await bcrypt.compare(currentPassword, user?.password)) {
    res.status(200).json({ message: "Successful" });
  } else {
    res.status(400).json({ message: "Current Password is incorrect" });
  }
};

export default checkPassword;
