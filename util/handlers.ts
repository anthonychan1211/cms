import {
  validateEmail,
  validatePassword,
  userIsExisted,
  confirmPasswordMatch,
} from "../util/validation";
import {
  signUpFetch,
  logInFetch,
  addHeader,
  updateDocument,
} from "../util/fetcher";
import { forgetPassword } from "../util/fetcher";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
} from "react";
import { resolve } from "path";

export async function handleRegister(
  e:
    | FormEvent<HTMLFormElement>
    | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  passwordLength: number
) {
  e.preventDefault();
  // getting form data
  const [userName, projectName, email, password] = [
    document.querySelector("form")!.userName.value.toLowerCase(),
    document.querySelector("form")!.projectName.value.toLowerCase(),
    document.querySelector("form")!.email.value.toLowerCase(),
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

export async function handleForgotPassword(e: any, email: string) {
  e.preventDefault();

  const button = document.querySelector("button") as HTMLElement;
  button.innerText = "Loading...";
  button.setAttribute("disabled", "");
  const feedBack = await forgetPassword(email);
  if (!feedBack) {
    const errorTextBox = document.querySelector(".status-error") as HTMLElement;
    const errorBanner = document.querySelector(".error-banner") as HTMLElement;
    errorTextBox.innerText = "This email is not registered";
    errorBanner.style.height = "fit-content";
    errorTextBox.style.transform = "translateY(0)";
    button.innerText = "Reset Password";
    button.removeAttribute("disable");
    return;
  } else {
    button.innerText = feedBack.success;
    button.classList.add("shown");
  }
}

export async function handleDeleteCollection(
  userDB: string,
  collectionName: string
) {
  const res = await fetch("api/deleteCollection", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      collectionName,
      userDB,
    }),
  });

  const feedBack = await res.json();
  window.sessionStorage.removeItem("lastSelect");
  window.location.reload();
}

export function extractHeader(headerObj: {}) {
  const keys = Object.keys(headerObj as object);

  keys.splice(
    keys.findIndex((el) => el === "_id"),
    1
  );
  keys.splice(
    keys.findIndex((el) => el === "Collection"),
    1
  );

  return keys;
}

export async function handleAddHeaderForm(
  e: { preventDefault: () => void },
  collectionName: string
) {
  e.preventDefault();
  let properties: string[] = [];
  let type: Array<string | string[]> = [];
  const input = document.querySelectorAll(
    ".propertyName"
  ) as NodeListOf<HTMLInputElement>;
  const select = document.querySelectorAll(
    ".valueType"
  ) as NodeListOf<HTMLInputElement>;
  input.forEach((el) => properties.push(el.value));
  select.forEach((el) => {
    if (el.value === "Select") {
      let optionArr: string[] = [];
      const options = el.parentElement?.querySelectorAll(
        ".choices"
      ) as NodeListOf<HTMLInputElement>;
      options?.forEach((option: HTMLInputElement) =>
        optionArr.push(option.value)
      );
      type.push(optionArr);
    } else {
      type.push(el.value);
    }
  });
  const headerObj: any = {
    Collection: collectionName,
  };
  properties.forEach((property, index) => (headerObj[property] = type[index]));
  return headerObj;
}

export function handleImagePreview(
  e: ChangeEvent<HTMLInputElement>,
  newDocument: { [x: string]: string[] },
  setNewDocument: React.Dispatch<
    React.SetStateAction<{ [x: string]: string | {} }>
  >
) {
  if (e.target.files?.length) {
    let arr: string[] = [];
    let originalArr = newDocument[e.target.name] || [];

    Array.from(e.target.files).forEach((element) => {
      const reader = new FileReader();
      reader.onload = function (onLoadEvent) {
        arr.push(onLoadEvent.target?.result as string);

        setNewDocument({
          ...newDocument,
          [e.target.name]: [...originalArr, ...arr],
        });
      };
      reader.readAsDataURL(element);
    });
    return arr;
  }
}

export async function handleSubmitAddDocument(
  e: { preventDefault: () => void },
  newDocument: {},
  collectionName: string,
  userDB: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  e.preventDefault();
  const entries = Object.entries(newDocument);
  console.log(entries);
  entries.forEach(async (el: any) => {
    if (typeof el[1] === "object") {
      if (Array.isArray(el[1])) {
        console.log("run");
        let arr: string[] = [];
        for (let i = 0; i < el[1].length; i++) {
          const data = new FormData();
          data.append("file", el[1][i]);
          data.append("upload_preset", "qygeysbp");
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/doeejabc9/image/upload",
            {
              method: "POST",
              body: data,
            }
          );
          const file = await res.json();
          if (file) arr.push(file.secure_url);
        }
        el.splice(1, 1, arr);

        handleAddDocumentAPIFetch(
          Object.fromEntries(entries),
          collectionName,
          userDB,
          setLoading
        );
      }
    }
  });
  handleAddDocumentAPIFetch(newDocument, collectionName, userDB, setLoading);
}
export async function handleAddDocumentAPIFetch(
  newDoc: {},
  collectionName: string,
  userDB: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const addDocumentFeedBack = await fetch("api/addDocument", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ newDoc, collectionName, userDB }),
  });
  const feedBack = await addDocumentFeedBack.json();
  if (addDocumentFeedBack.status === 400) {
    console.log("Error on add new document");
  }
  if (addDocumentFeedBack.status === 200) {
    console.log(feedBack.message);
    setLoading(false);
    window.location.reload();
  }
}

export async function uploadImage(el: string[]) {
  const partition = el.reduce(
    (result: string[][], element: string) => {
      element.includes("data:image/")
        ? result[0].push(element)
        : result[1].push(element);

      return result;
    },
    [[], []]
  );
  for (let i = 0; i < partition[0].length; i++) {
    const data = new FormData();
    data.append("file", partition[0][i]);
    data.append("upload_preset", "qygeysbp");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/doeejabc9/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    if (file) {
      partition[1].push(file.secure_url);
    }
  }
  console.log(partition[1]);
  return partition[1];
}

export async function handleDeleteDocument(
  userDB: string,
  collectionName: string,
  chosenDocument: {}
) {
  const res = await fetch("api/deleteDocument", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ chosenDocument, collectionName, userDB }),
  });
  const feedBack = await res.json();
  console.log(feedBack);
  window.location.reload();
}

export async function handleEdit(
  chosenDocument: { [key: string]: string },
  collectionName: string,
  userDB: string,
  key: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const entries = Object.entries(chosenDocument);

  for await (const el of entries) {
    if (Array.isArray(el[1])) {
      const uploaded = await uploadImage(el[1]);
      el[1].splice(0, el[1].length, ...uploaded);
      console.log(Object.fromEntries(entries));
      updateDocument(
        Object.fromEntries(entries),
        collectionName,
        userDB,
        key,
        setLoading
      );
    }
  }
  updateDocument(chosenDocument, collectionName, userDB, key, setLoading);
  return;
}
