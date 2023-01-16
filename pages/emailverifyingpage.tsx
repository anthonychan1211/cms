import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
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

const emailverifyingpage = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [word, setword] = useState("register");
  const router = useRouter();
  const { query } = useRouter();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const email = query.email as string;
        const token = query.token as string;
        const projectName = query.projectName as string;
        const purpose = query.purpose as string;
        setword(purpose);
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
          setTimeout(() => router.push(`/dashboard/${projectName}`), 3000);
          return;
        }
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [query]);

  return (
    <>
      {!validUrl ? (
        <p>Not verified</p>
      ) : word === "register" ? (
        <StyledPage>
          <img src="greenTick.png"></img>
          <h1>Email has been verified</h1>
          <p>This page is going to redirect...</p>
        </StyledPage>
      ) : (
        <StyledPage>
          <img src="greenTick.png"></img>
          <h1>Password has been updated</h1>
          <p>This page is going to redirect...</p>
        </StyledPage>
      )}
    </>
  );
};

export default emailverifyingpage;
