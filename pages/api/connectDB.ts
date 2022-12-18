import clientPromise from "../../lib/mongodb";

export default async function connectDB(database: string) {
  try {
    const client = await clientPromise;
    const db = client.db(database);
    console.log(`successfully connect to ${database}`);
    // const collections = await db.listCollections().toArray();
    // const results = JSON.parse(JSON.stringify(collections));
    // const data = await db.collection("phones").find({}).toArray();
    // const properties = JSON.parse(JSON.stringify(data));
    // return {
    //   props: { results },
    // };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
