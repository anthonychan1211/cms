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
const Body = ({
  collections = [],
  userDB,
}: {
  collections: [];
  userDB: string;
}) => {
  const [chosenCollection, setChosenCollection] = useState<string>("");
  const [header, setHeader] = useState({});
  const [doc, setDoc] = useState<string[]>([]);
  const router = useRouter();
  const { query } = useRouter();
  const clickedCollection = query.collection as string;
  if (clickedCollection !== chosenCollection) {
    setChosenCollection(clickedCollection);
    if (typeof window === "object" && clickedCollection) {
      const clicked = document.querySelector(
        `#${clickedCollection}`
      ) as HTMLElement;
      Array.from(clicked?.parentElement!.children).forEach((el) =>
        el.classList.remove("open")
      );
      clicked?.classList.add("open");
    }
  }
  // onClick Effect
  useEffect(() => {
    if (chosenCollection) {
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
    }
  }, [clickedCollection]);
  function handleChooseCollection(e: { currentTarget: HTMLElement }) {
    const clicked = e.currentTarget as HTMLElement;
    setChosenCollection(clicked.innerText);
    router.replace(
      `${router.basePath}${userDB}?collection=${clicked.innerText}`
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
        collectionName={chosenCollection}
        userDB={userDB}
      />
    </StyledBody>
  );
};

export default Body;
