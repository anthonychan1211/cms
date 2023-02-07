import { StyledDeleteAccount, StyledDeleteConfirm } from "./styles";
import React, { useState } from "react";
import { useRouter } from "next/router";
const DeleteAccountModal = ({
  setModal,
  userDB,
}: {
  setModal: React.Dispatch<React.SetStateAction<string>>;
  userDB: string;
}) => {
  const router = useRouter();
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState({
    email: "",
    password: "",
  });
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
      console.log("run");
      setDeleteConfirm(true);
      // setModal("");
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

export default DeleteAccountModal;
