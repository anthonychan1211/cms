import styled from "styled-components";
export const StyleHTML = styled.div`
  height: 100vh;
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }

  background: linear-gradient(var(--primary), var(--secondary));
  h1 {
    margin: 0;
    margin-left: 5%;
    color: whitesmoke;
    width: 70%;
    font-size: min(8vw, 70px);
  }
`;
export const StyledLandingPage = styled.div`
  height: 100vh;
  width: 30%;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
  text-align: center;
  background-color: white;
`;

export const StyledBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  box-sizing: border-box;
  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    padding: 10px;
    background-color: var(--primary);
    color: white;
  }

  form {
    margin: 0;
    grid-column: span 2;
    padding: 30px;
    height: 100%;
    position: relative;
    flex-direction: column;
  }
  button {
    width: 100%;
    margin-top: 20px;
  }
  .form__group {
    width: 100%;
  }
  .open-tab {
    background-color: white;
    color: black;
  }
  .warning {
    color: red;
    font-size: 12px;
    line-height: 0;
    margin: 0;
    margin-top: 8px;
    padding-block: 4px;
    text-align: left;
    display: none;
  }
  .password-requirement {
    font-size: 12px;
    line-height: 13px;
    margin: 0;
    margin-bottom: 20px;
    text-align: left;
  }
  .error-banner {
    height: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .status-error {
    font-size: 14px;
    background-color: #c90000;
    color: white;
    border-radius: 4px;
    text-align: left;
    padding: 10px 20px;
    transform: translateY(-100%);
    transition: all 0.3s;
  }
  .shown {
    background-color: green;
    color: white;
    padding: 10px;
    height: fit-content;
    transition: all 0.3s;
  }

  .forgot-password {
    font-size: 12px;
    color: blue;
    text-align: left;
    text-decoration: underline;
    cursor: pointer;
    width: fit-content;
    display: grid;
    align-items: center;
    background-color: white;
    :hover {
      box-shadow: none;
    }
  }
  .success {
    background-color: var(--green);
    border-radius: 15px;
    font-size: 18px;
    padding: 10px;
    transform: translateY(-200%);
    transition: all 0.2s ease-in-out;
  }
  .success.active {
    transform: translateY(0);
    transition: all 0.2s ease-in-out;
  }
`;

export const StyledPage = styled.div`
  text-align: center;
  margin-top: 100px;
  img {
    height: 300px;
  }
  p {
    font-size: 17px;
  }
`;

export const StyledMainPage = styled.div`
  position: relative;
  overflow: hidden;
`;
