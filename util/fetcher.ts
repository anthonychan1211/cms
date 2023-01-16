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
  console.log(res);
  const feedBack = await res.text();

  return feedBack;
}

export async function forgetPassword(email: string, password: string) {
  const res = await fetch("api/forgetPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const feedBack = await res.json();
  if (feedBack.status === 400) return null;
  return feedBack;
}
