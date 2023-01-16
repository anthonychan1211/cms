import { useState } from "react";
import styled from "styled-components";
import {
  handleRegister,
  handleLogIn,
  handleForgotPassword,
} from "../util/handlers";
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
    transition: all 0.1s;
  }
  .shown {
    background-color: green;
    color: white;
    padding: 10px;
    height: fit-content;
    transition: all 0.3s;
  }
  .resend {
    font-size: 12px;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
    text-align: left;
    width: fit-content;
    display: none;
  }
  .forgot-password {
    font-size: 12px;
    color: blue;
    text-align: left;
    text-decoration: underline;
    cursor: pointer;
    width: fit-content;
  }
`;
const index = () => {
  // Handle tab swtich
  const [shown, setShown] = useState("Sign In");
  const passwordLength = 8;

  const handleClick = (e: { currentTarget: any }) => {
    const clickedItem = e.currentTarget;
    if (clickedItem.innerText === "Forgot your password?") {
      const tag = document.querySelectorAll("h2") as NodeListOf<HTMLElement>;
      tag.forEach((el) => (el.style.borderBottom = "1px solid black"));
      return setShown(clickedItem.innerText);
    }
    for (const child of clickedItem.parentElement.children) {
      child.style.borderBottom = "1px solid black";
    }
    clickedItem.style.borderBottom = "none";
    setShown(clickedItem.innerText);
    const errorTextBox = document.querySelector(".status-error") as HTMLElement;
    const errorBanner = document.querySelector(".error-banner") as HTMLElement;
    const inputBox = document.querySelectorAll(
      "input"
    ) as NodeListOf<HTMLInputElement>;
    errorTextBox.innerText = "";
    errorBanner.style.height = "0";
    errorTextBox.style.transform = "translateY(-100%)";
    inputBox.forEach((el) => (el.value = ""));
  };
  const [signUpFormData, setsignUpFormData] = useState({
    userName: "",
    projectName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signInFormData, setsignInFormData] = useState({
    email: "",
    password: "",
  });
  const [forgetPasswordFormData, setforgetPasswordFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (shown === "Sign In") {
      setsignInFormData({
        ...signInFormData,
        [e.target.name]: e.target.value,
      });
    } else if (shown === "Register") {
      setsignUpFormData({
        ...signUpFormData,
        [e.target.name]: e.target.value,
      });
    } else if (shown === "Forgot your password?") {
      setforgetPasswordFormData({
        ...forgetPasswordFormData,
        [e.target.name]: e.target.value,
      });
    }
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
              <input
                name="email"
                type="text"
                value={signInFormData.email}
                onChange={handleChange}
              ></input>

              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="text"
                onChange={handleChange}
                value={signInFormData.password}
              ></input>
              <button onClick={handleClick} className="forgot-password">
                Forgot your password?
              </button>
            </div>
            <button type="submit">Sign In</button>
          </form>
        ) : shown === "Register" ? (
          <form
            method="POST"
            onSubmit={(e) => {
              handleRegister(e, passwordLength);
            }}
          >
            <div className="register-form">
              <div className="error-banner">
                <p className="status-error"></p>
              </div>
              <label htmlFor="userName">User Name</label>
              <input
                name="userName"
                type="text"
                onChange={handleChange}
                value={signUpFormData.userName}
                required
              ></input>
              <label htmlFor="projectName">Project Name</label>
              <input
                name="projectName"
                type="text"
                onChange={handleChange}
                value={signUpFormData.projectName}
                required
              ></input>
              <label htmlFor="email">Email</label>
              <p className="warning" id="email-warning">
                Please enter a valid Email
              </p>
              <input
                name="email"
                type="text"
                onChange={handleChange}
                value={signUpFormData.email}
                required
              ></input>
              <label htmlFor="password">Create New Password</label>
              <p className="warning" id="password-warning">
                Please enter a valid password
              </p>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                value={signUpFormData.password}
                required
              ></input>
              <p className="password-requirement" id="password-warning">
                Password must be at least {passwordLength} characters
              </p>
              <label htmlFor="password">Confirm your Password</label>
              <p className="warning" id="confirm-password-warning">
                Please enter the same password.
              </p>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                value={signUpFormData.confirmPassword}
                required
              ></input>
            </div>
            <button className="register-button" type="submit">
              Register
            </button>
            <button className="resend" onClick={(e) => handleRegister(e, 8)}>
              Resend Email
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <div className="sign-in-form">
              <div className="error-banner">
                <p className="status-error">Email is registered.</p>
              </div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                onChange={handleChange}
                value={forgetPasswordFormData.email}
              ></input>

              <label htmlFor="password">Create New Password</label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                value={forgetPasswordFormData.password}
              ></input>
              <p className="password-requirement" id="password-warning">
                Password must be at least {passwordLength} characters
              </p>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <p className="warning">Please enter the same password.</p>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                value={forgetPasswordFormData.confirmPassword}
              ></input>
            </div>
            <button type="submit">Reset password</button>
            <button className="resend" onClick={(e) => handleRegister(e, 8)}>
              Resend Email
            </button>
          </form>
        )}
      </StyledBody>
    </StyledLandingPage>
  );
};

export default index;
