import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
const addHeader = async (req: NextApiRequest, res: NextApiResponse) => {
  const { headerObj, userDB } = req.body;
  const client = await clientPromise;
  console.log(headerObj);
  try {
    await client.db(userDB).collection("Schemas").insertOne(headerObj);
    res.status(200).json({ message: "Headers added successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default addHeader;
