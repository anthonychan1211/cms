import { useState } from "react";
import { StyleHTML, StyledLandingPage, StyledBody } from "../styles/globals";
import {
  handleRegister,
  handleLogIn,
  handleForgotPassword,
} from "../util/handlers";

const index = () => {
  // Handle tab swtich
  const [shown, setShown] = useState("Sign In");
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState("");
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
      <h1>BRICK</h1>
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
                <a onClick={handleClick} className="forgot-password">
                  Forgot your password?
                </a>
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
            <form
              onSubmit={(e) => handleForgotPassword(e, forgetPasswordEmail)}
            >
              <div className="sign-in-form">
                <div className="error-banner">
                  <p className="status-error"></p>
                </div>
                {/* Email */}
                <div className="form__group field">
                  <input
                    type="text"
                    className="form__field"
                    value={forgetPasswordEmail}
                    onChange={(e) => setForgetPasswordEmail(e.target.value)}
                    placeholder="Confirm Password"
                    name="email"
                    id="email"
                    required
                  />
                  <label htmlFor="email" className="form__label">
                    Email
                  </label>
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
