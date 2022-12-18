import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledPartition = styled.div`
  padding: 5px 40px;
  border-right: 1px solid black;
  box-sizing: border-box;
  height: 100vh;
  button {
    width: 150px;
    justify-self: end;
    align-self: center;
    border: none;
    background-color: var(--light-blue);
    color: var(--black);
    font-size: 15px;
    border-radius: 10px;
    height: 40px;
    margin-bottom: 20px;
    :hover {
      box-sizing: border-box;
      box-shadow: 0px 0px 3px black;
    }
    :active {
      box-shadow: none;
    }
  }
  .no-collection {
    font-size: 20px;
  }
`;

const StyledCollection = styled.div`
  * {
    padding: 10px 30px;
    width: 150px;
    height: 50px;
    border-radius: 8px;
    font-size: 15px;
    box-sizing: border-box !important;
    margin-block: 2px;
    :hover {
      cursor: pointer;
      outline: 2px solid #eee;
      box-sizing: border-box;
    }
  }
`;

const CurrentCollection = ({ data }: any) => {
  return (
    <StyledPartition>
      <button>+ Add Collection</button>
      <StyledCollection>
        {data.length > 0 ? data : <p>Add your first collection!</p>}
      </StyledCollection>
    </StyledPartition>
  );
};

export default CurrentCollection;
