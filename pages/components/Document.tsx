import React, { useEffect } from "react";
import styled from "styled-components";

const NewEntry = styled.button`
  margin: 20px 40px;
  float: right;
`;
const StyledHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 60%;
  text-align: center;
  justify-content: space-evenly;
  margin: 10px 90px;
`;
const Document = ({ header, values }: any) => {
  //   console.log(typeof data);
  //   const mappedData = data.forEach((item: any) => {
  //     <div>{item.name}</div>;
  //   });
  const mappedHeader =
    header.length > 0
      ? header.map((el: any) => {
          return <p>{el}</p>;
        })
      : "";
  console.log(values);
  const mappedValues =
    values.length > 0
      ? values.map((item: any) => {
          return (
            <StyledHeader>
              {item.map((el: any) => {
                return <p>{el}</p>;
              })}
            </StyledHeader>
          );
        })
      : "";
  console.log(mappedValues);
  return (
    <div>
      <NewEntry>+ Add New Entry</NewEntry>
      <StyledHeader>{mappedHeader}</StyledHeader>
      {mappedValues}
    </div>
  );
};

export default Document;
