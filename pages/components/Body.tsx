import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CurrentCollection from "./CurrentCollection";
import Document from "./Document";

const StyledBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`;
const Body = ({ collections = [], userDB }: any) => {
  const [query, setQuery] = useState("");
  const [header, setHeader] = useState<string[]>([]);
  const [doc, setDoc] = useState("");
  const handleClick = (e: any) => {
    const clickedTarget = e.currentTarget;
    for (const child of clickedTarget.parentElement.children) {
      child.style.backgroundColor = "white";
    }
    clickedTarget.style.backgroundColor = "var(--light-grey)";
    setQuery(clickedTarget.innerText);
  };

  // onClick Effect
  useEffect(() => {
    if (query) {
      const data = getDocument(query);

      data.then((res) => {
        // get header
        res.length > 0
          ? res.forEach((item: any) => {
              const header = Object.keys(item);
              setHeader(header);
              // setting header column
              document.documentElement.style.setProperty(
                "--column-number",
                header.length.toString()
              );
            })
          : setHeader([]);
        // get document data
        let values: any = [];
        res.forEach((item: any) => {
          values.push(Object.values(item));
        });
        setDoc(values);
      });
    }
  }, [query]);

  const mappedCollections = collections.map((el: any) => (
    <p id={el.name} onClick={handleClick}>
      {el.name}
    </p>
  ));

  async function getDocument(query: any) {
    if (query) {
      const res = await fetch(
        `http://localhost:3000/api/queryDocument/?` +
          new URLSearchParams({
            query,
            userDB,
          }),
        {
          method: "GET",
        }
      );
      const data = await res.json();

      return data;
    }
  }

  return (
    <StyledBody>
      <CurrentCollection data={mappedCollections} userDB={userDB} />
      <Document header={header} values={doc} collectionName={query} />
    </StyledBody>
  );
};

export default Body;
