import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
const editHeader = async (req: NextApiRequest, res: NextApiResponse) => {
  const { headerObj, userDB, collectionName } = req.body;
  const client = await clientPromise;

  try {
    await client
      .db(userDB)
      .collection("Schemas")
      .replaceOne({ Collection: collectionName }, headerObj);

    res.status(200).json({ message: "Document has been updated!" });
  } catch (error) {
    console.log(error);
  }
};

export default editHeader;
