import {
  validateEmail,
  validatePassword,
  userIsExisted,
  confirmPasswordMatch,
} from "../util/validation";
import { signUpFetch, logInFetch } from "../util/fetcher";
import { useRouter } from "next/router";
import { forgetPassword } from "../util/fetcher";
import { FormEvent, MouseEvent } from "react";

export async function handleRegister(
  e:
    | FormEvent<HTMLFormElement>
    | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  passwordLength: number
) {
  e.preventDefault();
  // getting form data
  const [userName, projectName, email, password] = [
    document.querySelector("form")!.userName.value,
    document.querySelector("form")!.projectName.value,
    document.querySelector("form")!.email.value,
    document.querySelector("form")!.password.value,
  ];
  // validate the email and password and confirm password

  if (!validateEmail(email)) {
    const emailWarning = document.querySelector(
      "#email-warning"
    )! as HTMLElement;
    emailWarning.style.display = "block";
    return;
  } else if (!validatePassword(password, passwordLength)) {
    const passwordWarning = document.querySelector(
      "#password-warning"
    )! as HTMLElement;
    passwordWarning!.style.display = "block";
    return;
  } else if (!confirmPasswordMatch(e)) {
    const warning = document.querySelector(
      "#confirm-password-warning"
    ) as HTMLElement;
    return (warning.style.display = "block");
  }
  // if everything is valid, send to backend to check if user exists. If not, create new user.
  else {
    // Button Effect
    const registerButton = document.querySelector(
      ".register-button"
    ) as HTMLElement;
    registerButton.innerText = "Loading...";
    registerButton.setAttribute("disabled", "");
    // Api fetching to sign up
    const res = await signUpFetch(userName, projectName, email, password);
    // catch error
    if (res.status === 400) {
      const feedBack = await res.text();
      userIsExisted(feedBack);
    }
    if (res.status === 200) {
      const feedBack = await res.json();
      registerButton.innerText = feedBack.success;
      registerButton.classList.add("shown");
      const resendLink = document.querySelector(".resend") as HTMLElement;
      resendLink.style.display = "block";
    }
  }
}

export async function handleLogIn(e: any) {
  e.preventDefault();
  const [userEmail, password] = [
    document.querySelector("form")!.email.value,
    document.querySelector("form")!.password.value,
  ];
  const res = await logInFetch(userEmail, password);

  if (res.status === 400) {
    const errorTextBox = document.querySelector(".status-error") as HTMLElement;
    const errorBanner = document.querySelector(".error-banner") as HTMLElement;
    errorBanner.style.height = "fit-content";
    errorTextBox.style.transform = "translateY(0)";
  } else {
    const feedBack = await res.json();

    window.location.replace(feedBack.successful);
  }
}

export async function handleForgotPassword(e: any) {
  e.preventDefault();
  const [email, password, confirmPassword, warning] = [
    document.querySelector("form")!.email.value,
    document.querySelector("form")!.password.value,
    document.querySelector("form")!.confirmPassword.value,
    document.querySelector(".warning") as HTMLElement,
  ];
  if (password !== confirmPassword) {
    console.log("run");
    warning.style.display = "block";
    return;
  }
  const button = document.querySelector("button") as HTMLElement;
  button.innerText = "Loading...";
  button.setAttribute("disabled", "");
  const feedBack = await forgetPassword(email, password);

  if (!feedBack) {
    const errorTextBox = document.querySelector(".status-error") as HTMLElement;
    const errorBanner = document.querySelector(".error-banner") as HTMLElement;
    errorTextBox.innerText = "This email is not registered";
    errorBanner.style.height = "fit-content";
    errorTextBox.style.transform = "translateY(0)";
    return;
  } else {
    button.innerText = feedBack.success;
    button.classList.add("shown");
    const resendLink = document.querySelector(".resend") as HTMLElement;
    resendLink.style.display = "block";
  }
}
