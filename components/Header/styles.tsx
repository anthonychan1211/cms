import styled from "styled-components";

export const StyledHeader = styled.div`
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
