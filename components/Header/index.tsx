import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  StyledHeader,
  StyledMenu,
  StyledChangePassword,
  StyledDeleteAccount,
  StyledDeleteConfirm,
} from "./styles";

const Header = ({ userName, userDB }: { userName: string; userDB: string }) => {
  const passwordLength = 8;
  const [showMenu, setShowMenu] = useState(false);
  const [modal, setModal] = useState("");
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState(false);
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [deleteAccount, setDeleteAccount] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  function nameCapitalize(name: string) {
    if (name.includes(" ")) {
      let arr = name.split(" ");
      return `${arr[0].charAt(0).toUpperCase() + arr[0].slice(1)} ${
        arr[1].charAt(0).toUpperCase() + arr[1].slice(1)
      }`;
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
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
      return setWarning("wrongCurrentPassword");
    } else if (res.status === 200) {
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
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
        setModal("");
      }
    }
  }
  async function handleDeleteAccount(e: { preventDefault: () => void }) {
    e.preventDefault();
    const res = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(deleteAccount),
    });
    if (res.status === 400) {
      return setInvalidCredential(true);
    } else {
      setDeleteConfirm(true);
      setModal("");
    }
  }
  async function handleDeleteConfirm() {
    try {
      const deleteConfirm = await fetch("api/deleteAccount", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userDB }),
      });
      if (deleteConfirm.status === 200) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <StyledHeader>
        <h1>CMS</h1>
        <p>Welcome Back, {nameCapitalize(userName)}</p>
        <button
          style={{ width: "50px", backgroundColor: "transparent" }}
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg
            style={{ width: "25px" }}
            viewBox="0 0 122.88 95.95"
            xmlSpace="preserve"
            fill="white"
          >
            <g>
              <path d="M8.94,0h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,17.88,0,13.86,0,8.94l0,0 C0,4.02,4.02,0,8.94,0L8.94,0z M8.94,78.07h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105 C4.02,95.95,0,91.93,0,87.01l0,0C0,82.09,4.02,78.07,8.94,78.07L8.94,78.07z M8.94,39.03h105c4.92,0,8.94,4.02,8.94,8.94l0,0 c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,56.91,0,52.89,0,47.97l0,0C0,43.06,4.02,39.03,8.94,39.03L8.94,39.03z" />
            </g>
          </svg>
        </button>
      </StyledHeader>
      <StyledMenu>
        <div className={showMenu ? "menu active" : "menu"}>
          <button
            onClick={() => {
              setModal("changePassword");
              setShowMenu(false);
            }}
          >
            Change Password
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              viewBox="0 0 48 48"
            >
              <path d="M0 0h48v48h-48z" fill="none" />
              <path
                fill="white"
                d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97l-.75-5.3c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3c-1.22.51-2.35 1.17-3.38 1.97l-4.98-2.01c-.45-.17-.97 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31c-.08.64-.14 1.29-.14 1.95s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3c1.22-.51 2.35-1.17 3.38-1.97l4.98 2.01c.45.17.97 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zm-14.86 5.05c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
              />
            </svg>
          </button>
          <button
            className="add-collection"
            onClick={() => router.replace("/")}
          >
            Log Out
            <svg
              height="23px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M725.333333 736V597.333333h-298.666666v-170.666666h298.666666V288L949.333333 512 725.333333 736M554.666667 85.333333a85.333333 85.333333 0 0 1 85.333333 85.333334v170.666666h-85.333333V170.666667H170.666667v682.666666h384v-170.666666h85.333333v170.666666a85.333333 85.333333 0 0 1-85.333333 85.333334H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333334V170.666667a85.333333 85.333333 0 0 1 85.333334-85.333334h384z"
                fill="white"
              />
            </svg>
          </button>
          <button
            id="deleteAccount"
            onClick={() => {
              setShowMenu(false);
              setModal("deleteAccount");
            }}
          >
            Delete Account
            <svg width={"25px"} viewBox="0 0 1024 1024">
              <path
                fill="white"
                d="M800 258h-576a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 25H256v576a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320h32a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32zM448 799.36a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0z m192 0a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0zM800 128H640v-32a32.64 32.64 0 0 0-32-32h-192a32 32 0 0 0-32 32V128H224a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32h576a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32z"
              />
            </svg>
          </button>
        </div>
        <p className={success ? "success active" : "success"}>
          Password has been changed!
        </p>
      </StyledMenu>
      {modal === "changePassword" && (
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
                type="submit"
                onClick={handleChangePassword}
                className="add-button"
              >
                Submit
              </button>
            </div>
          </form>
        </StyledChangePassword>
      )}

      {modal === "deleteAccount" && (
        <StyledDeleteAccount>
          <form className="inner-modal">
            <h4>Delete Account</h4>

            <div
              className={
                invalidCredential ? "error-banner active" : "error-banner"
              }
            >
              <p
                className={
                  invalidCredential ? "status-error active" : "status-error"
                }
              >
                Email or password is incorrect.
              </p>
            </div>

            <div className="form__group field">
              <input
                type="email"
                className="form__field email"
                placeholder="Email"
                name="email"
                id="email"
                value={deleteAccount.email}
                onChange={(e) =>
                  setDeleteAccount({
                    ...deleteAccount,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
              <label htmlFor="currentPassword" className="form__label">
                Email
              </label>
            </div>

            <div className="form__group field">
              <input
                type="password"
                className="form__field"
                value={deleteAccount.password}
                onChange={(e) =>
                  setDeleteAccount({
                    ...deleteAccount,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Password"
                name="password"
                id="password"
                required
              />
              <label htmlFor="password" className="form__label">
                Password
              </label>
            </div>

            <div className="submit-section">
              <button
                className="cancel-button"
                onClick={() => {
                  setModal("");
                  setDeleteAccount({
                    email: "",
                    password: "",
                  });
                  setInvalidCredential(false);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleDeleteAccount}
                className="delete-button"
              >
                Delete Account
              </button>
            </div>
          </form>
        </StyledDeleteAccount>
      )}
      {deleteConfirm && (
        <StyledDeleteConfirm>
          <div className="inner-modal">
            <h4>
              Do you confirm to delete the account? If confirmed, all data will
              be deleted permenantly.
            </h4>
            <div className="submit-section">
              <button
                className="cancel-button"
                onClick={() => {
                  setModal("");
                  setDeleteAccount({
                    email: "",
                    password: "",
                  });
                  setInvalidCredential(false);

                  setDeleteConfirm(false);
                }}
              >
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="delete-button">
                Delete Account
              </button>
            </div>
          </div>
        </StyledDeleteConfirm>
      )}
    </>
  );
};

export default Header;
