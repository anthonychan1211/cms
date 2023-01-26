import React, { useState, useEffect } from "react";
import { getDocument, getHeader } from "../../util/fetcher";
import CurrentCollection from "../CurrentCollection";
import Document from "../Document";
import { StyledBody } from "./styles";
import { useRouter } from "next/router";
/**
 * The main wrapper for the `dashboard` page component.
 * @param {Array} collections The user's collections, expected as an array
 */
const Body = ({
  collectionsList,
  userDB,
}: {
  collectionsList: [];
  userDB: string;
}) => {
  const [chosenCollection, setChosenCollection] = useState<string>("");
  const [header, setHeader] = useState({});
  const [doc, setDoc] = useState<string[]>([]);

  useEffect(() => {
    const lastSelect = window.sessionStorage.getItem("lastSelect");
    if (lastSelect && lastSelect !== chosenCollection) {
      handleChooseCollection(lastSelect);
    }
  }, []);
  // onClick Effect
  useEffect(() => {
    if (chosenCollection) {
      // get Header
      const header = getHeader(chosenCollection, userDB);
      header.then((res) => {
        if (res) {
          setHeader(res);
        } else {
          setHeader([]);
        }
      });
      const data = getDocument(chosenCollection, userDB);
      data.then((res) => {
        // get document data
        let values: any = [];
        res.forEach((item: {}) => {
          values.push(Object.values(item));
        });

        setDoc(values);
      });
      const clicked = document.getElementById(chosenCollection) as HTMLElement;
      Array.from(clicked?.parentElement!.children).forEach((el) =>
        el.classList.remove("open")
      );
      clicked?.classList.add("open");
    }
  }, [chosenCollection]);
  function handleChooseCollection(chosenCollection: string) {
    setChosenCollection(chosenCollection);
    const clicked = document.getElementById(chosenCollection) as HTMLElement;
    clicked &&
      Array.from(clicked.parentElement!.children).forEach((el) =>
        el.classList.remove("open")
      );
    clicked?.classList.add("open");
    window.sessionStorage.setItem("lastSelect", chosenCollection);
  }
  const mappedCollections = collectionsList.map((el) => (
    <button
      className="collection-name"
      id={el}
      onClick={(e) => handleChooseCollection(e.currentTarget.innerText)}
    >
      {el}
    </button>
  ));

  return (
    <StyledBody>
      <CurrentCollection collectionsList={mappedCollections} userDB={userDB} />
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
