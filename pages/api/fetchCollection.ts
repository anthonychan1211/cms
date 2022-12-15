import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function fetchCollection(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("db1");
  const collections = await db.listCollections().toArray();

  const results = JSON.parse(JSON.stringify(collections));
  console.log(results);
  res.send({ results });
}

export default fetchCollection;
