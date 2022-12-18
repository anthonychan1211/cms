import clientPromise from "../lib/mongodb";
import Body from "./components/Body";
import Header from "./components/Header";

const param_db = "db2";

export default function Home({ data }: any) {
  const collections = data.results;

  return (
    <>
      <Header />
      <Body collections={collections} paramDB={param_db} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const client = await clientPromise;
  const db = client.db(param_db);
  const res = await fetch(
    `http://localhost:3000/api/fetchCollection/?` +
      new URLSearchParams({
        db: param_db,
      }),
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return {
    props: { data },
  };
}
