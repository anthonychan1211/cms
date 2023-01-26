import { useState } from "react";
import styled from "styled-components";
import {
  handleRegister,
  handleLogIn,
  handleForgotPassword,
} from "../util/handlers";
const StyleHTML = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(var(--primary), var(--secondary));
  h1 {
    margin: 0;
    margin-left: 5%;
    color: whitesmoke;
  }
`;
const StyledLandingPage = styled.div`
  position: absolute;
  text-align: center;
  top: 0%;
  right: 0%;
  height: 100dvh;
  width: 30%;
  background-color: white;
`;

const StyledBody = styled.div`
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
    transition: all 0.1s;
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
`;
const index = () => {
  // Handle tab swtich
  const [shown, setShown] = useState("Sign In");
  const passwordLength = 8;

  const handleClick = (e: { currentTarget: any }) => {
    const signInTab = document.querySelector(".sign-in") as HTMLElement;
    const registerTab = document.querySelector(".register") as HTMLElement;
    if (e.currentTarget.innerText === "Sign In") {
      signInTab.classList.add("open-tab");
      registerTab.classList.remove("open-tab");
    } else if (e.currentTarget.innerText === "Register") {
      signInTab.classList.remove("open-tab");
      registerTab.classList.add("open-tab");
    } else {
      signInTab.classList.remove("open-tab");
      registerTab.classList.remove("open-tab");
    }
    setShown(e.currentTarget.innerText);
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
    <StyleHTML>
      <h1>CMS</h1>
      <StyledLandingPage>
        <StyledBody>
          <h2 className="sign-in open-tab" onClick={handleClick}>
            Sign In
          </h2>
          <h2 className="register" onClick={handleClick}>
            Register
          </h2>
          {shown === "Sign In" ? (
            <form onSubmit={handleLogIn}>
              <div className="sign-in-form">
                <div className="error-banner">
                  <p className="status-error">
                    Email or password is incorrect.
                  </p>
                </div>

                <div className="form__group field">
                  <input
                    type="text"
                    className="form__field"
                    value={signInFormData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    name="email"
                    id="email"
                    required
                  />
                  <label htmlFor="email" className="form__label">
                    Email
                  </label>
                </div>

                <div className="form__group field">
                  <input
                    type="password"
                    className="form__field"
                    value={signInFormData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                  />
                  <label htmlFor="password" className="form__label">
                    Password
                  </label>
                </div>
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
                {/* User Name */}
                <div className="form__group field">
                  <input
                    type="text"
                    className="form__field"
                    value={signUpFormData.userName}
                    onChange={handleChange}
                    placeholder="User Name"
                    name="userName"
                    id="userName"
                    required
                  />
                  <label htmlFor="userName" className="form__label">
                    User Name
                  </label>
                </div>
                {/* Project Name */}
                <div className="form__group field">
                  <input
                    type="text"
                    className="form__field"
                    value={signUpFormData.projectName}
                    onChange={handleChange}
                    placeholder="Project Name"
                    name="projectName"
                    id="projectName"
                    required
                  />
                  <label htmlFor="projectName" className="form__label">
                    Project Name
                  </label>
                </div>

                {/* Email */}
                <div className="form__group field">
                  <input
                    type="text"
                    className="form__field"
                    value={signUpFormData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    name="email"
                    id="email"
                    required
                  />
                  <label htmlFor="email" className="form__label">
                    Email
                  </label>
                  <p className="warning" id="email-warning">
                    Please enter a valid Email
                  </p>
                </div>
                {/* Password */}
                <div className="form__group field">
                  <input
                    type="password"
                    className="form__field"
                    value={signUpFormData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                  />
                  <label htmlFor="password" className="form__label">
                    Password
                  </label>
                  <p className="warning" id="password-warning">
                    Please enter a valid password
                  </p>
                </div>
                <p className="password-requirement" id="password-warning">
                  Password must be at least {passwordLength} characters
                </p>
                {/* Confirm Password */}
                <div className="form__group field">
                  <input
                    type="password"
                    className="form__field"
                    value={signUpFormData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                  />
                  <label htmlFor="confirmPassword" className="form__label">
                    Confirm Password
                  </label>
                  <p className="warning" id="confirm-password-warning">
                    Please enter the same password.
                  </p>
                </div>
              </div>
              <button className="register-button" type="submit">
                Register
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <div className="sign-in-form">
                <div className="error-banner">
                  <p className="status-error">Email is registered.</p>
                </div>
                {/* Email */}
                <div className="form__group field">
                  <input
                    type="text"
                    className="form__field"
                    value={signUpFormData.email}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    name="email"
                    id="email"
                    required
                  />
                  <label htmlFor="email" className="form__label">
                    Email
                  </label>
                </div>

                {/* Password */}
                <div className="form__group field">
                  <input
                    type="password"
                    className="form__field"
                    value={signUpFormData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                  />
                  <label htmlFor="password" className="form__label">
                    Password
                  </label>
                  <p className="password-requirement" id="password-warning">
                    Password must be at least {passwordLength} characters
                  </p>
                </div>
                {/* <label htmlFor="confirmPassword">Confirm Password</label>
              <p className="warning">Please enter the same password.</p>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                value={forgetPasswordFormData.confirmPassword}
              ></input> */}
                <div className="form__group field">
                  <input
                    type="password"
                    className="form__field"
                    value={signUpFormData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                  />
                  <label htmlFor="confirmPassword" className="form__label">
                    Confirm Password
                  </label>
                  <p className="warning">Please enter the same password.</p>
                </div>
              </div>
              <button type="submit">Reset password</button>
            </form>
          )}
        </StyledBody>
      </StyledLandingPage>
    </StyleHTML>
  );
};

export default index;
