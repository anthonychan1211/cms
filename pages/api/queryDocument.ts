import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function queryDocument(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const reqDoc = req.query.query;
  const reqDB = req.query.paramDB;
  console.log(reqDoc);
  const db = client.db(reqDB as string);
  const data = await db
    .collection(reqDoc as string)
    .find()
    .toArray();

  res.send(data);
}

export default queryDocument;
