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
  background-color: #ff0000;
  :hover {
    cursor: pointer;
  }
`;

export const StyledDocument = styled.table`
  height: auto;
  overflow: scroll;
  text-align: center;
  justify-content: space-evenly;
  margin: 0 auto;
  width: 80%;

  * {
    margin: 0;
    padding-inline: 10px;
  }
  table {
  }
  th {
    background-color: #eeeeee;
    border-bottom: 2px solid var(--black);
    font-size: 15px;
    position: sticky;
  }
  td {
    font-size: 15px;
    max-height: 300px;
    text-overflow: ellipsis;
    border-bottom: 1px solid var(--black);
  }

  tbody > tr {
    border-bottom: 1px solid var(--black);
    :hover * {
      cursor: pointer;
      background-color: var(--light-grey);
    }
  }

  .collage {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-items: center;
    align-items: center;
    * {
      border: none;
    }
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
    margin-top: 0;
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
          background-color: var(--green);
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
    margin-top: 0;
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
    .gallery-grid {
      display: grid;
      grid-template-columns: auto auto auto;
      align-items: center;
      justify-items: center;
      gap: 5px;
    }
    .image {
      position: relative;
      display: inline;

      .delete-image {
        position: absolute;
        top: -20px;
        left: -10px;
        cursor: pointer;
      }
    }
    img {
      max-width: 100%;
      max-height: 150px;
    }
    p {
      font-size: 16px;
    }
    .lds-ellipsis {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-ellipsis div {
      position: absolute;
      top: 33px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #000;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .lds-ellipsis div:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(24px, 0);
      }
    }
  }
`;
export const StyledEditModal = styled.div`
  position: absolute;
  h4 {
    margin-top: 0;
  }
  width: 100vw;
  height: 100vh;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  background-color: #00000061;
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
    .control-panel {
      .delete-button {
        background-color: red;
        margin-left: 5px;
      }
      float: right;
    }
    .input-section {
      min-height: 80%;
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: auto auto auto;
      align-items: center;
      justify-items: center;
      gap: 5px;
    }
    .image {
      position: relative;
      display: inline;

      .delete-image {
        position: absolute;
        top: -20px;
        left: -10px;
        cursor: pointer;
      }
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
      background-color: white;
      border: 2px solid var(--black);
    }
    .add-button {
      color: white;
      margin-top: 20px;
    }
    img {
      max-width: 100%;
      max-height: 150px;
    }
    input[type="file"] {
      display: block;
      margin-block: 20px;
    }
  }
`;
