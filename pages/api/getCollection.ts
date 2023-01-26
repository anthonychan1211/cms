import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
const getCollection = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const { userDB } = req.body;
  const db = client.db(userDB);
  const collections = await db.listCollections().toArray();
  const data = JSON.parse(JSON.stringify(collections));
  const schemaIndex = data.findIndex(
    (el: { name: string }) => el.name === "Schemas"
  );
  if (schemaIndex !== -1) {
    data.splice(schemaIndex, 1);
  }
  const collectionList: string[] = [];
  data.forEach((el: { name: string }) => collectionList.push(el.name));
  res.status(200).json({ collectionList });
};

export default getCollection;
