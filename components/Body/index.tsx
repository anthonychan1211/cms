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
  collectionsList: string[];
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

  function handleChooseCollection(clickedCollection: string) {
    setChosenCollection(clickedCollection);
    const clicked = document.getElementById(clickedCollection) as HTMLElement;
    const header = getHeader(clickedCollection, userDB);
    header.then((res) => {
      if (res) {
        setHeader(res);
      } else {
        setHeader([]);
      }
    });
    const data = getDocument(clickedCollection, userDB);
    data.then((res) => {
      // get document data
      let values: any = [];
      res.forEach((item: {}) => {
        values.push(Object.values(item));
      });

      setDoc(values);
    });
    if (collectionsList.length > 0 && clicked.parentElement) {
      Array.from(clicked.parentElement.children).forEach((el) =>
        el.classList.remove("open")
      );
      clicked?.classList.add("open");
      window.sessionStorage.setItem("lastSelect", clickedCollection);
    }
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
