import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
const updateDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionName, userDB, chosenDocument } = req.body;
  const { _id, ...purified } = chosenDocument;
  const client = await clientPromise;
  try {
    await client
      .db(userDB)
      .collection(collectionName)
      .replaceOne(
        { [`${collectionName}_id`]: chosenDocument[`${collectionName}_id`] },
        purified
      );

    res.status(200).json({ message: "Document has been updated!" });
  } catch (error) {
    console.log(error);
  }
};

export default updateDocument;
