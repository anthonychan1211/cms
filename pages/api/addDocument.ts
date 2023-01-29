import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
const addDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionName, userDB, newDoc } = req.body;
  const client = await clientPromise;
  try {
    await client.db(userDB).collection(collectionName).insertOne(newDoc);
    res.status(200).json({ message: "New Document added!" });
  } catch (error) {
    console.log(error);
  }
};
export const config = {
  api: {
    responseLimit: false,
  },
};
export default addDocument;
