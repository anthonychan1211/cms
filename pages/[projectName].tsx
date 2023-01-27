import clientPromise from "../lib/mongodb";
import Body from "../components/Body";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";

export default function Home({ sortedData, user }: any) {
  const router = useRouter();
  const projectName = router.query.projectName as string;
  console.log(sortedData);
  return (
    <>
      <Header userName={user.userName} />
      <Body collectionsList={sortedData} userDB={projectName} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const client = await clientPromise;

  const db = client.db(context.params.projectName);
  const collections = await db.listCollections().toArray();
  const data = JSON.parse(JSON.stringify(collections));
  const schemaIndex = data.findIndex(
    (el: { name: string }) => el.name === "Schemas"
  );
  if (schemaIndex !== -1) {
    data.splice(schemaIndex, 1);
  }

  let sortedData: string[] = [];
  data.forEach((el: { name: string }) => sortedData.push(el.name));
  sortedData.sort();
  const user = JSON.parse(
    JSON.stringify(
      await client
        .db("cms-user")
        .collection("user")
        .findOne({ projectName: context.params.projectName })
    )
  );

  return {
    props: { sortedData, user },
  };
}
