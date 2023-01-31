import styled from "styled-components";

export const NewEntry = styled.button`
  margin-right: 20px;
  margin-top: 20px;
  float: right;

  color: white;
`;

export const DeleteCollection = styled.button`
  margin-top: 20px;
  margin-right: 40px;
  float: right;
  color: white;
  background-color: #ff0000;
`;

export const StyledDocument = styled.div`
  display: grid;
  grid-template-columns: repeat(var(--column-number), minmax(auto, 1fr));
  overflow: scroll;
  text-align: center;
  justify-content: space-evenly;
  margin: 10px 90px;
  * {
    border-bottom: 1px solid var(--black);
    margin: 0;
    padding-inline: 10px;
  }
  .header {
    background-color: #eeeeee;
    border-bottom: 2px solid var(--black);
  }
  p {
    font-size: 15px;
    max-height: 300px;
    text-overflow: ellipsis;
  }

  .row {
    display: contents;

    :hover * {
      cursor: pointer;
      background-color: var(--light-grey);
    }
  }
  .collage {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: flex-start;
  }
`;

export const StyledHeaderForm = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  background-color: #00000061;
  h4 {
    margin: 0;
  }
  .inner-modal {
    position: relative;
    height: 80vh;
    width: 50vw;
    overflow: scroll;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2vh;
    border-radius: 20px;
    padding: 30px 50px;
    .input-section {
      min-height: 80%;
    }
    .add-button {
      color: white;
      margin-top: 20px;
    }
    .submit-section {
      float: right;
      .cancel-button {
        background-color: white;
        border: 2px solid var(--black);
        margin-inline: 8px;
      }
    }
    .cancel-button {
      color: var(--black);
    }
    .property-box {
      display: grid;
      grid-template-columns: 1fr 1fr 50px;
      align-items: center;
      gap: 5px;
      select {
        padding: 18px;
        margin: 0;
        width: 80%;
        font-size: 15px;
      }
      button {
        appearance: none;
        height: auto;
        width: auto;
        background-color: white;

        :hover {
          box-shadow: none;
          cursor: pointer;
        }
      }
      .add-choices {
        p {
          font-size: 12px;
          line-height: 0;
        }
        .choices {
          width: 100px;
          padding-block: 5px;
          font-size: 15px;
          margin-right: 5px;
        }
        button {
          color: white;
          font-size: 15px;
          padding: 10px;
        }
      }
    }
  }
`;

export const AddEntry = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  background-color: #00000061;
  h4 {
    margin: 0 0 30px 0;
  }
  .inner-modal {
    position: relative;
    height: 80vh;
    width: 50vw;
    overflow: scroll;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2vh;
    border-radius: 20px;
    padding: 30px 50px;
    .input-section {
      min-height: 80%;
    }
    .submit-section {
      float: right;
      .cancel-button {
        background-color: white;
        border: 2px solid var(--black);
        margin-inline: 8px;
      }
    }
    .cancel-button {
      color: var(--black);
    }
    .add-button {
      color: white;
      margin-top: 20px;
    }
    input[type="file"] {
      display: block;
      margin-block: 20px;
    }
    img {
      max-width: 100%;
      max-height: 150px;
    }
    p {
      font-size: 16px;
    }
  }
`;
