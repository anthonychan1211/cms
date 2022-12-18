import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CurrentCollection from "./CurrentCollection";
import Document from "./Document";

const StyledBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`;
const Body = ({ collections, paramDB }: any) => {
  const [query, setQuery] = useState("");
  const [header, setHeader] = useState("");
  const [doc, setDoc] = useState("");
  const handleClick = (e: any) => {
    const clickedTarget = e.currentTarget;
    for (const child of clickedTarget.parentElement.children) {
      child.style.backgroundColor = "white";
    }
    clickedTarget.style.backgroundColor = "#eee";
    setQuery(clickedTarget.innerText);
  };
  useEffect(() => {
    const data = getDocument(query);
    data.then((res) => {
      res.forEach((item: any) => {
        const header = Object.keys(item);
        setHeader(header);
      });
      let values = [];
      res.forEach((item: any) => {
        values.push(Object.values(item));
      });
      setDoc(values);
    });
  }, [query]);

  const mappedCollections = collections.map((el: any) => (
    <p onClick={handleClick}>{el.name}</p>
  ));

  async function getDocument(query: any) {
    const res = await fetch(
      `http://localhost:3000/api/queryDocument/?` +
        new URLSearchParams({
          query,
          paramDB,
        }),
      {
        method: "GET",
      }
    );
    const data = await res.json();

    // working on showing data
    return data;
  }

  return (
    <StyledBody>
      <CurrentCollection data={mappedCollections} />
      <Document header={header} values={doc} />
    </StyledBody>
  );
};

export default Body;
