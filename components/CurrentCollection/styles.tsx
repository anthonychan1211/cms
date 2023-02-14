import styled from "styled-components";

export const StyledPartition = styled.div`
  background-color: var(--light-grey);
  box-sizing: border-box;
  text-align: center;
  height: auto;
  width: 20%;
  overflow: scroll;
  .add-collection {
    width: 80%;
    margin: 20px auto;

    color: white;
    :hover {
      box-sizing: border-box;
      box-shadow: 0px 0px 3px black;
    }
    :active {
      box-shadow: none;
    }
    @media screen and (max-width: 950px) {
      margin: 0;
      height: 30px;
      width: 60%;
      border-radius: 8px;
      font-size: 12px;
    }
  }
  .no-collection {
    font-size: 18px;
  }
  .duplicate-collection-name {
    font-size: 12px;
    color: red;
  }
  p {
    font-size: 15px;
  }
  @media screen and (max-width: 950px) {
    margin-block: 0;
    width: 100%;
    height: fit-content;
    overflow: hidden;
    .collection-container {
      display: block;
      width: 100vw;
      overflow-x: scroll;
    }
  }
`;

export const StyledCollection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-items: center;
  gap: 3px;
  font-size: min(4vw, 16px);
  .collection-name {
    width: 100%;
    height: auto;
    margin: 0;
    color: var(--balck);
    background-color: var(--light-grey);
    border-radius: 0px;
    padding: 30px 2vw;
    text-align: left;
    justify-content: center;
    cursor: pointer;
    @media screen and (max-width: 950px) {
      margin-block: 0;
      padding: 10px;
      font-size: 12px;
    }
  }
  .collection-name.open {
    background-color: var(--dark-grey);
  }
  @media screen and (max-width: 950px) {
    flex-direction: row;
    height: fit-content;
    min-width: fit-content;
    width: 100%;
    overflow-x: auto;
  }
`;

export const StyledNewCollection = styled.form`
  display: flex;
  padding-left: 2vw;

  button {
    margin-block: 20px;
    margin-inline: 3px;
    width: fit-content;
    background-color: var(--green);
    color: white;
    .form__label {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 950px) {
    /* height: 25px; */
    margin-inline: 3vw;
    border-radius: 8px;
    font-size: 12px;
    button {
      font-size: 12px;
      margin: 0;
    }
  }
`;
