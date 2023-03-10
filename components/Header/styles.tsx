import styled from "styled-components";

export const StyledHeader = styled.div`
  display: grid;
  background: linear-gradient(var(--primary), var(--secondary));
  color: white;
  grid-template-columns: 5fr auto 0.3fr;
  justify-content: space-between;
  padding: 0px 50px;

  h1 {
    font-size: 30px;
  }
  button {
    color: var(--black);
    font-size: 18px;
  }
  p {
    text-align: end;
    align-self: center;
    font-size: 17px;
  }
  svg {
    width: 25px;
  }
  @media screen and (max-width: 600px) {
    padding-inline: 15px;
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 12px;
    }
    svg {
      width: 20px;
    }
  }
`;

export const StyledMenu = styled.div`
  z-index: 10;
  width: 220px;
  position: absolute;
  right: 0;
  transition: all 0.2s ease-in-out;
  transform: translateX(100%);
  button {
    border-radius: 0;
    width: 100%;
    height: 80px;
    display: grid;
    grid-template-columns: 6fr 1fr;
    align-items: center;
    :hover {
      background-color: #eda200;
    }
  }
  #deleteAccount {
    background-color: red;
    :hover {
      background-color: #c70000;
    }
  }
  .menu.active {
    background-color: #159320;
    color: white;
    display: grid;
    transform: translateX(-100%);
    transition: all 0.2s ease-in-out;
  }
  .menu {
    color: white;
    display: grid;
    transition: all 0.2s ease-in-out;
  }
  @media screen and (max-width: 600px) {
    width: 160px;
    button {
      font-size: 12px;
      height: 60px;
    }
  }
`;

export const StyledChangePassword = styled.div`
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: #00000061;
  position: absolute;

  .inner-modal {
    position: relative;
    height: 60vh;
    width: 50vw;
    @media screen and (max-width: 950px) {
      width: 100%;
    }
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
        color: var(--black);
        background-color: white;
        border: 2px solid var(--black);
        margin-inline: 8px;
      }
      @media screen and (max-width: 950px) {
        float: none;
        * {
          width: 45%;
          margin: 0 auto;
        }
      }
    }
    .add-button {
      background-color: var(--green);
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
      font-size: 12px;
    }
    .warning {
      color: red;
    }
  }
`;

export const StyledDeleteAccount = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 19;
  background-color: #00000061;
  position: absolute;
  .inner-modal {
    position: relative;
    width: 50vw;
    @media screen and (max-width: 950px) {
      width: 100%;
    }
    overflow: scroll;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2vh;
    border-radius: 20px;
    padding: 30px 50px;
    input {
      margin-block: 20px;
    }

    .submit-section {
      float: right;

      .cancel-button {
        background-color: white;
        border: 2px solid var(--black);
        margin-inline: 8px;
        color: var(--black);
      }
      .delete-button {
        background-color: red;
      }
      @media screen and (max-width: 950px) {
        float: none;
        * {
          width: 45%;
        }
      }
    }

    h4 {
      margin: 0;
    }
    p {
      font-size: 12px;
    }
    .error-banner {
      height: 0;
      overflow: hidden;
    }
    .error-banner.active {
      height: fit-content;
    }
    .status-error {
      font-size: 14px;
      background-color: #c90000;
      color: white;
      border-radius: 4px;
      text-align: left;
      padding: 10px 20px;
      transform: translateY(-200%);
      transition: all 0.3s 0.1s;
    }
    .status-error.active {
      transform: translateY(0%);
      transition: all 0.3s 0.1s;
    }
  }
`;

export const StyledDeleteConfirm = styled.div`
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: #00000061;
  .inner-modal {
    position: relative;
    height: 40vh;
    width: 50vw;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2vh;
    border-radius: 20px;
    padding: 30px 50px;
    @media screen and (max-width: 950px) {
      width: 100%;
    }
    .input-section {
      min-height: 80%;
    }

    .submit-section {
      float: right;
      .cancel-button {
        background-color: white;
        border: 2px solid var(--black);
        margin-inline: 8px;
        color: var(--black);
      }
      .delete-button {
        background-color: red;
      }
      @media screen and (max-width: 950px) {
        float: none;
        padding: 0;
        width: 100%;
        * {
          width: 45%;
        }
      }
    }
    @media screen and (max-width: 950px) {
      h4 {
        margin-top: 0px;
      }
    }
  }
`;

export const StyledSuccess = styled.div`
  .success {
    z-index: 20;
    height: fit-content;
    width: fit-content;
    position: fixed;
    top: 0;
    left: 50%;
    @media screen and (max-width: 950px) {
      left: 25%;
    }
    transform: translateX(-50%);
    background-color: var(--green);
    color: white;
    padding: 15px;
    border-radius: 20px;
    font-size: 14px;
    transform: translateY(-200%);
    transition: all 0.2s;
    opacity: 0.8;
  }
  .success.active {
    transform: translateY(200%);
    transition: all 0.2s;
  }
`;
