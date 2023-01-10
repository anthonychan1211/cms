import clientPromise from "../../lib/mongodb";
import Body from "../components/Body";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
const userDB = "db2";

export default function Home({ data }: any) {
  const router = useRouter();
  const projectName = router.query.projectName as string;
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

  return (
    <>
      <Header />
      <Body collections={sortedData} userDB={projectName} />
    </>
  );
}

export async function getStaticProps(context: any) {
  console.log(context.params);
  const client = await clientPromise;
  const db = client.db(context.params.projectName);
  const collections = await db.listCollections().toArray();
  const data = JSON.parse(JSON.stringify(collections));

  return {
    props: { data },
  };
}
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
