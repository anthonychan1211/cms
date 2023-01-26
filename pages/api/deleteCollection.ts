import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
const addHeader = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userDB, collectionName } = req.body;
  const client = await clientPromise;

  try {
    await client.db(userDB).collection(collectionName).drop();
    await client
      .db(userDB)
      .collection("Schemas")
      .deleteOne({ Collection: collectionName });
    res.status(200).json({ message: "Collection Deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default addHeader;
