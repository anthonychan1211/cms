import React from "react";

export async function signUpFetch(
  userName: string,
  projectName: string,
  email: string,
  password: string
) {
  const res = await fetch("/api/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
      projectName,
      email,
      password,
    }),
  });
  return res;
}

export async function logInFetch(userEmail: string, password: string) {
  const res = await fetch("api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password,
    }),
  });
  return res;
}

export async function checkUserExist(email: string) {
  const res = await fetch("api/getUserByEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const feedBack = res.json();

  return feedBack;
}

export async function hashPassword(password: string) {
  const res = await fetch("api/hashPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  });

  const feedBack = await res.json();

  return feedBack;
}

export async function forgetPassword(email: string) {
  const res = await fetch("api/forgetPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const feedBack = await res.json();
  if (res.status === 400) return null;
  return feedBack;
}

export async function getDocument(query: string, userDB: string) {
  const res = await fetch(
    `api/queryDocument/?` +
      new URLSearchParams({
        query,
        userDB,
      }),

    {
      method: "GET",
      headers: {
        "Content-type": "appliction/json",
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function addCollectionFetch(
  newCollection: string,
  userDB: string
) {
  const res = await fetch(`/api/addCollection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newCollection: newCollection,
      userDB,
    }),
  });
  return res;
}

export async function getHeader(query: string, userDB: string) {
  const res = await fetch(
    `api/getHeader/?` +
      new URLSearchParams({
        query,
        userDB,
      }),
    {
      method: "GET",
    }
  );
  const feedBack = await res.json();
  return feedBack;
}
export async function addHeader(headerObj: {}, userDB: string) {
  console.log("fetcher", headerObj);
  const res = await fetch("api/addHeader", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      headerObj,
      userDB,
    }),
  });

  const feedBack = await res.json();
}

export async function getCollection(userDB: string) {
  const res = await fetch("api/getCollection", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ userDB }),
  });
  const feedBack = await res.json();
  return feedBack.collectionList;
}

export async function updateDocument(
  chosenDocument: { [key: string]: string },
  collectionName: string,
  userDB: string,
  key: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const res = await fetch("api/updateDocument", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      collectionName,
      userDB,
      chosenDocument,
      key,
    }),
  });
  const feedBack = await res.json();
  if (res.status === 200) {
    console.log(feedBack.message);
    setLoading(false);
    window.location.reload();
  } else {
    console.log("error");
  }
}
