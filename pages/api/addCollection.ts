import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function addCollection(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { newCollection, userDB } = req.body;
    const client = await clientPromise;
    const database = client.db(userDB);
    console.log(newCollection, userDB);
    await database.createCollection(newCollection);
    res.status(200).json({ message: "Collection added!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

export default addCollection;
