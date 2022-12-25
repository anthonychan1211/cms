import { useState } from "react";
import styled from "styled-components";

const StyledLandingPage = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 30%;
`;

const StyledBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;
  h2 {
    border: 1px solid black;
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }
  form {
    margin: 0;
    grid-column: span 2;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    padding: 30px;
  }
  .sign-in {
    border-bottom: 0;
  }
  label {
    display: block;
    text-align: left;
    font-size: 18px;
  }
  input {
    width: 100%;
    font-size: 18px;
    padding: 3px;
  }
  .warning {
    color: red;
    font-size: 12px;
    line-height: 0;
    margin: 0;
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
`;
const login = () => {
  const [shown, setShown] = useState("Sign In");
  const handleClick = (e: any) => {
    const clickedItem = e.currentTarget;
    for (const child of clickedItem.parentElement.children) {
      child.style.borderBottom = "1px solid black";
    }
    clickedItem.style.borderBottom = "none";
    setShown(clickedItem.innerText);
  };
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      );
  };
  const validatePassword = (password: string, length: number) => {
    return password.length >= length;
  };
  const handleRegister = (e: any) => {
    e.preventDefault();
    const [userName, projectName, email, password] = [
      document.querySelector("form")!.userName.value,
      document.querySelector("form")!.projectName.value,
      document.querySelector("form")!.email.value,
      document.querySelector("form")!.password.value,
    ];
    const [emailWarning, passwordWarning] = [
      document.querySelector("#email-warning")! as HTMLElement,
      document.querySelector("#password-warning")! as HTMLElement,
    ];
    !validateEmail(email) ? (emailWarning!.style.display = "block") : "";

    !validatePassword(password, 6)
      ? (passwordWarning!.style.display = "block")
      : "";
    console.log(userName, projectName, email, password);
  };
  return (
    <StyledLandingPage>
      <h1>CMS</h1>
      <StyledBody>
        <h2 className="sign-in" onClick={handleClick}>
          Sign In
        </h2>
        <h2 className="register" onClick={handleClick}>
          Register
        </h2>
        {shown === "Sign In" ? (
          <form>
            <div className="sign-in-form">
              <label htmlFor="email">Email</label>
              <input name="email" type="text"></input>

              <label htmlFor="password">Password</label>
              <input name="password" type="text"></input>
            </div>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <form method="POST" onSubmit={handleRegister}>
            <div className="register-form">
              <label htmlFor="userName">User Name</label>
              <input name="userName" type="text"></input>
              <label htmlFor="projectName">Project Name</label>
              <input name="projectName" type="text"></input>
              <label htmlFor="email">Email</label>
              <p className="warning" id="email-warning">
                Please enter a valid Email
              </p>
              <input name="email" type="text"></input>
              <label htmlFor="password">Password</label>
              <p className="warning" id="password-warning">
                Please enter a valid password
              </p>
              <input name="password" type="text"></input>
              <p className="password-requirement" id="password-warning">
                Password must be at least 6 characters
              </p>
            </div>
            <button type="submit">Register</button>
          </form>
        )}
      </StyledBody>
    </StyledLandingPage>
  );
};

export default login;
