export function validateEmail(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );
}

export function validatePassword(password: string, length: number) {
  return password.length >= length;
}

export function userIsExisted(feedBack: any) {
  const errorTextBox = document.querySelector(".status-error") as HTMLElement;
  const errorBanner = document.querySelector(".error-banner") as HTMLElement;
  errorTextBox.innerText = feedBack;
  errorBanner.style.height = "fit-content";
  errorTextBox.style.transform = "translateY(0)";
}

export function confirmPasswordMatch(e: any) {
  e.preventDefault();
  const [password, confirmPassword] = [
    document.querySelector("form")!.password.value,
    document.querySelector("form")!.confirmPassword.value,
  ];

  return password === confirmPassword;
}
