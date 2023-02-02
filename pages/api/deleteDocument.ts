import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
const addHeader = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userDB, collectionName, chosenDocument } = req.body;
  const client = await clientPromise;

  try {
    await client
      .db(userDB)
      .collection(collectionName)
      .deleteOne({
        [`${collectionName}_id`]: chosenDocument[`${collectionName}_id`],
      });
    res.status(200).json({ message: "Document Deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export default addHeader;
