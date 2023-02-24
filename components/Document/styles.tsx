import styled from "styled-components";

export const StyledDocumentSection = styled.div`
  overflow: scroll;
  width: 100%;
  .document-collection-name {
    font-size: 35px;
    margin-left: 4vw;
    @media screen and (max-width: 950px) {
      font-size: 25px;
      margin-left: 4vw;
    }
  }
`;
export const NewEntry = styled.button`
  margin-right: 20px;
  margin-top: 20px;
  float: right;
  color: white;
  font-size: min(3vw, 15px);
  width: auto;
  padding-inline: min(4vw, 18px);
  @media screen and (max-width: 950px) {
    margin-right: 3vw;
  }
`;

export const DeleteCollection = styled.button`
  margin-top: 20px;
  margin-right: 40px;
  float: right;
  background-color: #ff0000;
  font-size: min(3vw, 15px);
  width: auto;
  padding-inline: min(4vw, 18px);
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 950px) {
    margin-right: 0;
  }
`;

export const StyledDocument = styled.table`
  margin: 0 auto;
  display: grid;
  overflow-x: scroll;
  min-width: 100%;
  grid-template-columns: repeat(var(--column-number), 1fr);
  * {
    margin: 0 auto;
    padding-inline: 10px;
    width: 100%;
  }
  thead,
  tbody,
  tr {
    display: contents;
  }
  th {
    background-color: #eeeeee;
    border-bottom: 2px solid var(--black);
    font-size: 15px;
    position: sticky;
  }
  th,
  td {
    min-width: max-content;
    font-size: 15px;
    max-height: 300px;
    text-align: center;
    border: 1px solid var(--light-grey);
    overflow: hidden;
  }

  tbody > tr {
    border-bottom: 1px solid var(--black);
    max-height: 300px;
    overflow: hidden;
    :hover * {
      cursor: pointer;
      background-color: var(--light-grey);
    }
    .text-area {
      min-width: 200px;
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
  @media screen and (max-width: 950px) {
    flex: 1 1 auto;
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
      .add-choices {
        p {
          font-size: 15px;
          margin-bottom: 0;
          line-height: 0;
          margin-top: 20px;
        }
        input {
          width: 100px;
          padding: 5px;
          margin-inline: 2px;
          margin-bottom: 15px;
        }
      }
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
    @media screen and (max-width: 950px) {
      width: 100vw;
    }
    overflow: scroll;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2vh;
    border-radius: 20px;
    padding: 30px 50px;
    .input-section {
      min-height: 80%;
      @media screen and (max-width: 950px) {
        min-height: 50%;
      }
    }
    .imageURLGrid {
      display: grid;
      grid-template-columns: 5fr 2fr 1fr;
      align-items: center;
      justify-items: space-around;
      gap: 10px;
    }
    .submit-section {
      float: right;
      margin: 0;
      .cancel-button {
        background-color: white;
        border: 2px solid var(--black);
        margin-inline: 8px;
        @media screen and (max-width: 950px) {
          margin-inline: 0;
        }
        color: var(--black);
      }
      .add-button {
        color: white;
        margin-top: 20px;
      }
      @media screen and (max-width: 950px) {
        float: none;
        * {
          width: 100%;
          margin-inline: 0;
        }
      }
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
export const StyledEditModal = styled.form`
  position: absolute;
  h4 {
    margin-top: 0;
  }
  width: 100vw;
  height: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  background-color: #00000061;
  .inner-modal {
    position: relative;
    height: 80vh;
    width: 50vw;
    @media screen and (max-width: 950px) {
      width: 100vw;
    }
    overflow: scroll;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2vh;
    border-radius: 20px;
    padding: 30px 50px;
    @media screen and (max-width: 950px) {
      padding: 30px 20px;
    }

    .control-panel {
      .delete-button {
        background-color: red;
        margin-left: 5px;
        @media screen and (max-width: 950px) {
          margin-left: 0px;
        }
      }
      float: right;
      @media screen and (max-width: 950px) {
        float: none;

        * {
          width: 50%;
        }
      }
    }
    .input-section {
      min-height: 80%;
      p {
        font-size: 16px;
      }
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: auto auto auto;
      align-items: center;
      justify-items: center;
      gap: 5px;
    }
    .imageURLGrid {
      display: grid;
      grid-template-columns: 5fr 2fr 1fr;
      align-items: center;
      justify-items: center;
      gap: 10px;
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
    .edit-mode-on {
      box-shadow: 2px 2px 10px var(--green);
      border: 2px solid var(--green);
      color: var(--green);
      background-color: white;
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

export const StyledDeleteCollection = styled.div`
  position: absolute;
  h4 {
    margin-top: 0;
  }
  width: 100vw;
  height: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  background-color: #00000061;
  .inner-modal {
    position: relative;
    width: 50vw;
    @media screen and (max-width: 950px) {
      width: 100vw;
    }
    overflow: scroll;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2vh;
    border-radius: 20px;
    padding: 30px 50px;
    p {
      font-size: 18px;
    }

    .submit-section {
      float: right;
      .cancel-button {
        background-color: white;
        border: 2px solid var(--black);
        margin-inline: 8px;
        color: var(--black);
      }
      .confirm-button {
        background-color: red;
      }
    }
  }
`;
