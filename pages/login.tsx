import clientPromise from "../lib/mongodb";
import Body from "./components/Body";
import Header from "./components/Header";
const userDB = "db2";

export default function Home({ data }: any) {
  type dataObject = {
    name: string;
    type: string;
    options: any;
    info: {};
    idIndex: {};
  };
  const sortedData = data.sort(
    (a: dataObject, b: dataObject) =>
      a.name.charCodeAt(0) - b.name.charCodeAt(0)
  );
  console.log(data);
  console.log(sortedData);
  return (
    <>
      <Header />
      <Body collections={sortedData} userDB={userDB} />
    </>
  );
}

export async function getStaticProps(context: any) {
  const client = await clientPromise;
  const db = client.db(userDB);
  const collections = await db.listCollections().toArray();
  const data = JSON.parse(JSON.stringify(collections));

  return {
    props: { data },
  };
}
