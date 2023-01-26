import React, { useState, useEffect } from "react";
import { getCollection, getHeader } from "../../util/fetcher";
import CurrentCollection from "../CurrentCollection";
import Document from "../Document";
import { StyledBody } from "./styles";
import { useRouter } from "next/router";
/**
 * The main wrapper for the `dashboard` page component.
 * @param {Array} collections The user's collections, expected as an array
 */
const Body = ({ collections, userDB }: { collections: []; userDB: string }) => {
  const [chosenCollection, setChosenCollection] = useState<string>("");
  const [header, setHeader] = useState({});
  const [doc, setDoc] = useState<string[]>([]);
  const router = useRouter();
  const { query } = useRouter();
  const clickedCollection = query.collection as string;

  if (
    typeof window === "object" &&
    clickedCollection &&
    collections.findIndex((el) => el === clickedCollection) !== -1
    // clickedCollection !== chosenCollection
  ) {
    setChosenCollection(clickedCollection);
  }

  // onClick Effect
  useEffect(() => {
    if (clickedCollection) {
      // get Header
      const header = getHeader(clickedCollection, userDB);
      header.then((res) => {
        if (res) {
          setHeader(res);
        } else {
          setHeader([]);
        }
      });
      const data = getCollection(clickedCollection, userDB);
      data.then((res) => {
        // get document data
        let values: any = [];
        res.forEach((item: {}) => {
          values.push(Object.values(item));
        });

        setDoc(values);
      });
      const clicked = document.getElementById(clickedCollection) as HTMLElement;
      Array.from(clicked?.parentElement!.children).forEach((el) =>
        el.classList.remove("open")
      );
      clicked?.classList.add("open");
    }
  }, [clickedCollection]);
  function handleChooseCollection(e: { currentTarget: HTMLElement }) {
    setChosenCollection(e.currentTarget.innerText);
    router.replace(
      `${router.basePath}${userDB}?collection=${e.currentTarget.innerText}`
    );
  }
  const mappedCollections = collections.map((el: { name: "" }) => (
    <button
      className="collection-name"
      id={el.name}
      onClick={handleChooseCollection}
    >
      {el.name}
    </button>
  ));

  return (
    <StyledBody>
      <CurrentCollection data={mappedCollections} userDB={userDB} />
      <Document
        headerObj={header}
        values={doc}
        collectionName={clickedCollection}
        userDB={userDB}
      />
    </StyledBody>
  );
};

export default Body;
