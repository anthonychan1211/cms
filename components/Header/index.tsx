import { useRouter } from "next/router";
import React from "react";
import { StyledHeader } from "./styles";

const Header = ({ userName }: { userName: string }) => {
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
    <StyledHeader>
      <h1>CMS</h1>
      <p>Welcome Back, {nameCapitalize(userName)}</p>
      <button className="add-collection" onClick={() => router.replace("/")}>
        Log Out
      </button>
    </StyledHeader>
  );
};

export default Header;
