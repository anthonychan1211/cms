import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function fetchCollection(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;

  const reqDB = req.query.db;
  const db = client.db(reqDB as string);
  const collections = await db.listCollections().toArray();
  const results = JSON.parse(JSON.stringify(collections));
  res.json({ results });
}

export default fetchCollection;
