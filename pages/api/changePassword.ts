import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";
const checkPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userDB, newPassword } = req.body;

  const client = await clientPromise;
  const hashPassword = await bcrypt.hash(newPassword, 10);

  try {
    await client
      .db("cms-user")
      .collection("user")
      .updateOne(
        { projectName: userDB },
        {
          $set: {
            password: hashPassword,
          },
        }
      );
    res.status(200).json({ message: "Password has been updated" });
  } catch (error) {
    res.status(400).json({ message: "Couldn't change password" });
  }
};

export default checkPassword;
