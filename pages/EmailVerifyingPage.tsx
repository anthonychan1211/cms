import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const StyledPage = styled.div`
  text-align: center;
  margin-top: 100px;
  img {
    height: 300px;
  }
  p {
    font-size: 17px;
  }
`;

const EmailVerifyingPage = () => {
  const [validUrl, setValidUrl] = useState(true);
  const router = useRouter();
  const { query } = useRouter();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const userId = query.userId as string;
        const token = query.token as string;
        console.log(userId, token);
        if (userId && token) {
          const data = await fetch(
            `/api/verifyEmail?` +
              new URLSearchParams({
                userId,
                token,
              }),
            {
              method: "GET",
            }
          );
          const result = await data.json();
          console.log(result);
          //   save token onto client's browser
          Cookies.set("jwt", result, { httpOnly: true });
          setValidUrl(true);
          return;
        }
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
    setTimeout(() => router.push("/login"), 300000);
  }, [query]);

  return (
    <>
      {validUrl ? (
        <StyledPage>
          <img src="greenTick.png"></img>
          <h1>Email has been verified</h1>
          <p>This page is going to redirect...</p>
        </StyledPage>
      ) : (
        <p>Not verified</p>
      )}
    </>
  );
};

export default EmailVerifyingPage;
