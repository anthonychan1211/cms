import React from "react";
import styled from "styled-components";
import CurrentCollection from "./CurrentCollection";
import Document from "./Document";

const StyledBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`;
const Body = () => {
  return (
    <StyledBody>
      <CurrentCollection />
      <Document />
    </StyledBody>
  );
};

export default Body;
