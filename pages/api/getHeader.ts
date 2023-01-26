import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
const getHeader = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, userDB } = req.query;
  const client = await clientPromise;
  try {
    const header = await client
      .db(userDB as string)
      .collection("Schemas")
      .findOne({ Collection: query });

    if (!header) {
      res.status(200).json(null);
    } else {
      res.status(200).json(header);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default getHeader;
