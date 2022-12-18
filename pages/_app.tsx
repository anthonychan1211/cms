import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "./components/Header";
import { createGlobalStyle } from "styled-components";
import CurrentCollection from "./components/CurrentCollection";
const GlobalStyles = createGlobalStyle`
  html {
    --light-blue: #c9d3ef;
    --dark-blue: #5c6486;
    --black: #414141;
    --offWhite: #ededed;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
  }
  body{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
  *, *:before,*:after{
    box-sizing: inherit;
  }
  a{
    text-decoration: none;
    color: var(--black)
  }
  a:hover{
    text-decoration: underline;
  }
  button {
    width: 150px;
    justify-self: end;
    align-self: center;
    border: none;
    background-color: var(--light-blue);
    color: var(--black);
    font-size: 15px;
    border-radius: 10px;
    height: 40px;
    :hover {
      box-sizing: border-box;
      box-shadow: 0px 0px 3px black;
    }
    :active {
      box-shadow: none;
    }
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
