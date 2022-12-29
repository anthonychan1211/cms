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

  button {
    width: 100%;
    margin-top: 20px;
  }
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
    line-height: 15px;
    margin-top: 30px;
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
    transition: all 0.1s;
  }
  .shown {
    background-color: green;
    color: white;
  }
`;
const login = () => {
  // Handle tab swtich
  const [shown, setShown] = useState("Sign In");
  const passwordLength = 6;

  const handleClick = (e: any) => {
    const clickedItem = e.currentTarget;
    for (const child of clickedItem.parentElement.children) {
      child.style.borderBottom = "1px solid black";
    }
    clickedItem.style.borderBottom = "none";
    setShown(clickedItem.innerText);
  };

  // Create helper on validating password and email
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

  // handle register function
  const handleRegister = async (e: any) => {
    e.preventDefault();
    // getting form data
    const [userName, projectName, email, password] = [
      document.querySelector("form")!.userName.value,
      document.querySelector("form")!.projectName.value,
      document.querySelector("form")!.email.value,
      document.querySelector("form")!.password.value,
    ];
    // validate the email and password
    const [emailWarning, passwordWarning] = [
      document.querySelector("#email-warning")! as HTMLElement,
      document.querySelector("#password-warning")! as HTMLElement,
    ];
    !validateEmail(email) ? (emailWarning!.style.display = "block") : "";

    !validatePassword(password, passwordLength)
      ? (passwordWarning!.style.display = "block")
      : "";

    // if everything is valid, send to backend to check if user exists. If not, create new user.
    if (validateEmail(email) && validatePassword(password, passwordLength)) {
      // Button Effect
      const registerButton = document.querySelector(
        ".register-button"
      ) as HTMLElement;
      registerButton.innerText = "Loading...";
      registerButton.setAttribute("disabled", "");
      // Api fetching to sign up
      const res = await fetch("http://localhost:3000/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          projectName,
          email,
          password,
        }),
      });
      // catch error
      if (res.status === 400) {
        const feedBack = await res.text();
        const errorTextBox = document.querySelector(
          ".status-error"
        ) as HTMLElement;
        const errorBanner = document.querySelector(
          ".error-banner"
        ) as HTMLElement;
        errorTextBox.innerText = feedBack;
        errorBanner.style.height = "fit-content";
        errorTextBox.style.transform = "translateY(0)";
      }
      if (res.status === 200) {
        const feedBack = await res.text();
        if (feedBack) {
          registerButton.innerText = feedBack;
          registerButton.classList.add("shown");
        }
      }
    }
  };

  const handleLogIn = async (e: any) => {
    e.preventDefault();
    const [userEmail, password] = [
      document.querySelector("form")!.email.value,
      document.querySelector("form")!.password.value,
    ];
    console.log(userEmail, password);
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
          <form onSubmit={handleLogIn}>
            <div className="sign-in-form">
              <div className="error-banner">
                <p className="status-error">Email or password is incorrect.</p>
              </div>
              <label htmlFor="email">Email</label>
              <input name="email" type="text"></input>

              <label htmlFor="password">Password</label>
              <input name="password" type="text"></input>
            </div>
            <button type="submit">Sign In</button>
          </form>
        ) : (
          <form method="POST" onSubmit={handleRegister}>
            <div className="register-form">
              <div className="error-banner">
                <p className="status-error"></p>
              </div>
              <label htmlFor="userName">User Name</label>
              <input name="userName" type="text" required></input>
              <label htmlFor="projectName">Project Name</label>
              <input name="projectName" type="text" required></input>
              <label htmlFor="email">Email</label>
              <p className="warning" id="email-warning">
                Please enter a valid Email
              </p>
              <input name="email" type="text" required></input>
              <label htmlFor="password">Password</label>
              <p className="warning" id="password-warning">
                Please enter a valid password
              </p>
              <input name="password" type="text" required></input>
              <p className="password-requirement" id="password-warning">
                Password must be at least {passwordLength} characters
              </p>
            </div>
            <button className="register-button" type="submit">
              Register
            </button>
          </form>
        )}
      </StyledBody>
    </StyledLandingPage>
  );
};

export default login;
