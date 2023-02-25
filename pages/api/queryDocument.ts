import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export const config = {
  api: {
    responseLimit: false,
  },
};
async function queryDocument(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const reqDoc = req.query.query;
  const reqDB = req.query.userDB;

  const db = client.db(reqDB as string);
  const data = await db
    .collection(reqDoc as string)
    .find()
    .toArray();
  res.json({ data });
}

export default queryDocument;
