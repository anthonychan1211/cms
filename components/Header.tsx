import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 5fr auto 1fr;
  justify-content: space-between;
  padding: 0px 50px;
  border-bottom: 8px solid var(--black);
  h1 {
    font-size: 30px;
  }
  button {
    width: 150px;
    justify-self: end;
    align-self: center;
    border: none;
    background-color: var(--light-blue);
    color: var(--black);
    font-size: 15px;
    border-radius: 10px;
    height: 60px;
    :hover {
      box-sizing: border-box;
      box-shadow: 0px 0px 3px black;
    }
    :active {
      box-shadow: none;
    }
  }
  p {
    text-align: end;
    align-self: center;
    font-size: 17px;
  }
`;
const Header = ({ userName }: any) => {
  function nameCapitalize(name: string) {
    if (name.includes(" ")) {
      let arr = name.split(" ");
      return `${arr[0].charAt(0).toUpperCase() + arr[0].slice(1)} ${
        arr[1].charAt(0).toUpperCase() + arr[1].slice(1)
      }`;
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  return (
    <StyledHeader>
      <h1>CMS</h1>
      <p>Welcome Back, {nameCapitalize(userName)}</p>
      <button className="add-collection">Log Out</button>
    </StyledHeader>
  );
};

export default Header;
