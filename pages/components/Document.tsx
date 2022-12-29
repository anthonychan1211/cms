import React, { useEffect } from "react";
import styled from "styled-components";

const NewEntry = styled.button`
  margin-right: 20px;
  margin-top: 20px;
  float: right;
`;
const DeleteCollection = styled.button`
  margin-top: 20px;
  margin-right: 40px;
  float: right;
  color: white;
  background-color: #ff0000;
`;
const StyledDocument = styled.div`
  display: grid;
  grid-template-columns: repeat(var(--column-number), minmax(auto, 1fr));
  overflow: hidden;
  text-align: center;
  justify-content: space-evenly;
  margin: 10px 90px;
  * {
    border-bottom: 1px solid var(--black);
    margin: 0;
    padding-inline: 10px;
  }
  .header {
    background-color: var(--light-blue);
    border-bottom: 2px solid var(--black);
  }
  p {
    font-size: 15px;
  }
  .row {
    display: contents;
    :hover * {
      cursor: pointer;
      background-color: var(--light-grey);
    }
  }
`;
const Document = ({ header = [], values = [], collectionName }: any) => {
  const mappedHeader =
    header.length > 0
      ? header.map((el: any) => {
          return <p className="header">{el}</p>;
        })
      : "";

  const mappedValues =
    values.length > 0
      ? values.map((item: any) => {
          return (
            <div className="row">
              {item.map((el: any) => {
                return <p className="data">{el}</p>;
              })}
            </div>
          );
        })
      : "";
  return (
    <div>
      {collectionName ? (
        <div>
          <DeleteCollection>Delete Collection</DeleteCollection>
          {mappedHeader ? (
            <NewEntry>+ Add New Entry</NewEntry>
          ) : (
            <NewEntry>+ Add Header</NewEntry>
          )}
        </div>
      ) : null}

      <h1 className="document-collection-name">{collectionName}</h1>
      {mappedValues ? (
        <StyledDocument>
          {mappedHeader}
          {mappedValues}
        </StyledDocument>
      ) : null}
    </div>
  );
};

export default Document;
