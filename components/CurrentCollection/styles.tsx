import styled from "styled-components";

export const StyledPartition = styled.div`
  background-color: var(--light-grey);
  box-sizing: border-box;
  height: 100vh;
  text-align: center;
  .add-collection {
    width: 80%;
    margin: 20px auto;
    background-color: var(--green);
    color: white;
    :hover {
      box-sizing: border-box;
      box-shadow: 0px 0px 3px black;
    }
    :active {
      box-shadow: none;
    }
  }
  .no-collection {
    font-size: 18px;
  }
  .duplicate-collection-name {
    font-size: 12px;
    color: red;
  }
`;

export const StyledCollection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-items: center;
  gap: 3px;

  .collection-name {
    width: 100%;
    height: auto;
    margin: 0;
    color: var(--balck);
    background-color: var(--light-grey);
    border-radius: 0px;
    padding: 30px 40px;
    justify-content: center;
    text-align: left;
    font-size: 18px;
    cursor: pointer;
  }
  .collection-name.open {
    background-color: var(--dark-grey);
  }
`;

export const StyledNewCollection = styled.form`
  display: flex;
  gap: 10px;
  padding-left: 40px;

  button {
    margin-block: 20px;
    margin-inline: 3px;
    width: fit-content;
    background-color: var(--green);
    color: white;
    padding-inline: 15px;
    .form__label {
      font-size: 12px;
    }
  }
`;
