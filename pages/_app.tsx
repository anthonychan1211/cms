import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
  --column-number: 0;
}
  html {
    --background-color: #e7e7e7;
    --light-blue: #008cff36;
    --green: #33b249;
    --dark-blue: #5c6486;
    --black: #414141;
    --light-grey: #e7e7e7;
    --dark-grey: #c4c4c4;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    --primary: #16bb45;
    --secondary: #38ef7d;
    box-sizing: border-box;
    
  }
  body{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 2;
    
  }
  .form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 100%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid var(--dark-grey);
  outline: 0;
  font-size: 1rem;
  color: var(--black);
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1rem;
    cursor: text;
    top: 20px;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: var(--dark-grey);
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 0.8rem;
    color: var(--primary);
    font-weight:700;    
  }
  padding-bottom: 6px;  
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, var(--primary),var(--secondary));
  border-image-slice: 1;
}
/* reset input */
.form__field{
  &:required,&:invalid { box-shadow:none; }
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
    background-color: var(--primary);
    color: white;
    font-size: 15px;
    border-radius: 10px;

    height: 40px;
    :hover:not([disabled]) {
      cursor: pointer;
    }
    :active:not([disabled]){
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
