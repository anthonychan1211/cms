import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

async function signUp(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const reqDoc = req.body;
  const reqDB = req.query.userDB;
  const db = client.db(reqDB as string);
  const data = await db
    .collection(reqDoc as string)
    .find()
    .toArray();
  res.send(data);
}

export default signUp;
