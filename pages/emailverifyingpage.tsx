import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  StyledPage,
  StyleHTML,
  StyledLandingPage,
  StyledBody,
} from "../styles/globals";

const emailverifyingpage = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [word, setword] = useState("register");
  const [forgetPasswordFormData, setForgetPasswordFormData] = useState({
    projectName: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { query } = useRouter();
  const passwordLength = 8;
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const email = query.email as string;
        const token = query.token as string;
        const projectName = query.projectName as string;
        const purpose = query.purpose as string;
        setword(purpose);
        setForgetPasswordFormData({
          ...forgetPasswordFormData,
          projectName: projectName,
        });
        if (email && token) {
          const data = await fetch(
            `/api/verifyEmail?` +
              new URLSearchParams({
                email,
                token,
                purpose,
              }),
            {
              method: "GET",
            }
          );
          const result = await data.text();
          setValidUrl(true);
          if (purpose === "register") {
            router.push(`${projectName}`);
          }
          return;
        }
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [query]);

  async function handleChangePassword(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log(forgetPasswordFormData.projectName);
    const res = await fetch("api/changePassword", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userDB: forgetPasswordFormData.projectName,
        newPassword: forgetPasswordFormData.password,
      }),
    });
    if (res.status === 400) {
      console.log(await res.json());
    } else {
      setSuccess(true);
      setTimeout(() => router.replace("/"), 3000);
    }
  }
  return (
    <>
      {!validUrl ? (
        <p>Not verified</p>
      ) : word === "register" ? (
        <StyledPage>
          <img src="/greenTick.png"></img>
          <h1>Email has been verified</h1>
          <p>This page is going to redirect...</p>
        </StyledPage>
      ) : (
        <StyleHTML>
          <h1>CMS</h1>
          <StyledLandingPage>
            <StyledBody>
              <form onSubmit={handleChangePassword}>
                <p className={success ? "success active" : "success"}>
                  Password has been updated!
                </p>
                <div className="form__group field">
                  <input
                    type="password"
                    className="form__field"
                    value={forgetPasswordFormData.password}
                    onChange={(e) =>
                      setForgetPasswordFormData({
                        ...forgetPasswordFormData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                  />
                  <label htmlFor="password" className="form__label">
                    Create New Password
                  </label>
                  <p className="password-requirement" id="password-warning">
                    Password must be at least {passwordLength} characters
                  </p>
                </div>

                <div className="form__group field">
                  <input
                    type="password"
                    className="form__field"
                    value={forgetPasswordFormData.confirmPassword}
                    onChange={(e) =>
                      setForgetPasswordFormData({
                        ...forgetPasswordFormData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                  />
                  <label htmlFor="confirmPassword" className="form__label">
                    Confirm Password
                  </label>
                </div>
                <p className="warning">Please enter the same password.</p>
                <button type="submit">Reset password</button>
              </form>
            </StyledBody>
          </StyledLandingPage>
        </StyleHTML>
      )}
    </>
  );
};

export default emailverifyingpage;
