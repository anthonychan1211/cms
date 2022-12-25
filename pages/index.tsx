import clientPromise from "../lib/mongodb";
import Body from "./components/Body";
import Header from "./components/Header";

const userDB = "db2";

export default function Home({ data }: any) {
  const collections = data.results;

  return (
    <>
      <Header />
      <Body collections={collections} userDB={userDB} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const client = await clientPromise;
  client.db(userDB);
  const res = await fetch(
    `http://localhost:3000/api/fetchCollection/?` +
      new URLSearchParams({
        db: userDB,
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
