import React, { useState } from "react";
import { StyledChangePassword } from "./styles";

const ChangePasswordModal = ({
  setModal,
  userDB,
  setSuccess,
}: {
  setModal: React.Dispatch<React.SetStateAction<string>>;
  userDB: string;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [warning, setWarning] = useState("");

  const passwordLength = 8;

  async function handleChangePassword(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (changePassword.newPassword !== changePassword.confirmNewPassword) {
      return setWarning("same");
    }
    if (changePassword.newPassword.length < passwordLength) {
      setWarning("");
      const warning = document.querySelector(
        "#password-warning"
      ) as HTMLElement;
      warning.classList.add("warning");
    }
    const res = await fetch("/api/checkPassword", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userDB,
        currentPassword: changePassword.currentPassword,
      }),
    });

    if (res.status === 400) {
      console.log("wrong password");
      return setWarning("wrongCurrentPassword");
    } else if (res.status === 200) {
      try {
        const pwChange = await fetch("/api/changePassword", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userDB,
            newPassword: changePassword.newPassword,
          }),
        });
        if (pwChange.status === 200) {
          setSuccess(true);
          console.log("password changed");
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
          setModal("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <StyledChangePassword>
      <form className="inner-modal">
        <div className="form__group field">
          <input
            type="password"
            className="form__field currentPassword"
            placeholder="Current Password"
            name="currentPassword"
            id="currentPassword"
            value={changePassword.currentPassword}
            onChange={(e) =>
              setChangePassword({
                ...changePassword,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
          <label htmlFor="currentPassword" className="form__label">
            Current Password
          </label>
        </div>
        {warning === "wrongCurrentPassword" && <p>Password incorrect</p>}
        <div className="form__group field">
          <input
            type="password"
            className="form__field"
            value={changePassword.newPassword}
            onChange={(e) =>
              setChangePassword({
                ...changePassword,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Password"
            name="newPassword"
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
            value={changePassword.confirmNewPassword}
            onChange={(e) =>
              setChangePassword({
                ...changePassword,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Confirm Password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            required
          />
          <label htmlFor="confirmNewPassword" className="form__label">
            Confirm New Password
          </label>
          {warning === "same" && (
            <p className="warning">Please enter the same password.</p>
          )}
        </div>
        <div className="submit-section">
          <button
            className="cancel-button"
            onClick={() => {
              setModal("");
              setChangePassword({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
              });
              setWarning("");
            }}
          >
            Cancel
          </button>
          <button
            onClick={(e) => handleChangePassword(e)}
            className="add-button"
          >
            Submit
          </button>
        </div>
      </form>
    </StyledChangePassword>
  );
};

export default ChangePasswordModal;
