import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function addCollection(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;
    const newCollectionName = data.newCollection;
    const userDB = data.userDB;
    const client = await clientPromise;
    const database = client.db(userDB);
   
      await database.createCollection(newCollectionName);
      res.json({ message: "Collection added!" });
    
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

export default addCollection;
