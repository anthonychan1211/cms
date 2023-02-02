import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  StyledHeader,
  StyledMenu,
  StyledDeleteAccount,
  StyledDeleteConfirm,
  StyledSuccess,
} from "./styles";
import {
  hambergerMenuIcon,
  changePasswordIcon,
  logOutIcon,
  deleteAccountIcon,
} from "../../util/button";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";
const Header = ({ userName, userDB }: { userName: string; userDB: string }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [modal, setModal] = useState("");
  const [success, setSuccess] = useState(false);

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

  return (
    <>
      <StyledHeader>
        <h1>CMS</h1>
        <p>Welcome Back, {nameCapitalize(userName)}</p>
        <button
          style={{ width: "50px", backgroundColor: "transparent" }}
          onClick={() => setShowMenu(!showMenu)}
        >
          {hambergerMenuIcon}
        </button>
      </StyledHeader>

      {/* change Password success banner */}

      <StyledSuccess>
        {" "}
        <p className={success ? "success active" : "success"}>
          Password has been changed!
        </p>
      </StyledSuccess>

      {/* Menu Component */}
      <StyledMenu>
        <div className={showMenu ? "menu active" : "menu"}>
          <button
            onClick={() => {
              setModal("changePassword");
              setShowMenu(false);
            }}
          >
            Change Password
            {changePasswordIcon}
          </button>
          <button
            className="add-collection"
            onClick={() => router.replace("/")}
          >
            Log Out
            {logOutIcon}
          </button>
          <button
            id="deleteAccount"
            onClick={() => {
              setShowMenu(false);
              setModal("deleteAccount");
            }}
          >
            Delete Account
            {deleteAccountIcon}
          </button>
        </div>
      </StyledMenu>

      {modal === "changePassword" && (
        <ChangePasswordModal
          setModal={setModal}
          userDB={userDB}
          setSuccess={setSuccess}
        />
      )}

      {modal === "deleteAccount" && (
        <DeleteAccountModal setModal={setModal} userDB={userDB} />
      )}
    </>
  );
};

export default Header;
