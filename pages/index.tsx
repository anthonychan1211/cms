import clientPromise from "../lib/mongodb";
import Body from "./components/Body";

export async function getServerSideProps(context: any) {
  try {
    const client = await clientPromise;
    const db = client.db("db2");
    const collections = await db.listCollections().toArray();
    const results = JSON.parse(JSON.stringify(collections));
    const data = await db.collection("phones").find({}).toArray();
    const properties = JSON.parse(JSON.stringify(data));
    return {
      props: { results },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({ results }: any) {
  return (
    <>
      <Body />
    </>
  );
}
