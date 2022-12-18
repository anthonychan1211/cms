import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function add(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  const client = await clientPromise;
  const database = client.db("db1");
  const phone = database.collection("computer");
  const result = await phone.insertOne(data);
  res.json({ data });
}

export default add;
