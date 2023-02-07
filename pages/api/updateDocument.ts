import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
const updateDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionName, userDB, chosenDocument, key } = req.body;
  const { _id, ...purified } = chosenDocument;
  const client = await clientPromise;
  try {
    await client
      .db(userDB)
      .collection(collectionName)
      .replaceOne({ [key]: chosenDocument[key] }, purified);

    res.status(200).json({ message: "Document has been updated!" });
  } catch (error) {
    console.log(error);
  }
};

export default updateDocument;
