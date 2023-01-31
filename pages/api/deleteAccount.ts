import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
const addHeader = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userDB } = req.body;
  const client = await clientPromise;

  try {
    const deleteDB = await client.db(userDB).dropDatabase();
    console.log(deleteDB, "dropDB");
    const deleteUser = await client
      .db("cms-user")
      .collection("user")
      .deleteOne({ projectName: userDB });
    console.log(deleteUser, "deleteUser");
    if (deleteDB && deleteUser) {
      res.status(200).json({ message: "Database Deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export default addHeader;
