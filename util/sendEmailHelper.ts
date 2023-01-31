export async function sendEmailHelper(emailVerificationToken: any) {
  const emailSent = await fetch(`${process.env.BASE_URI}api/sendEmail`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(emailVerificationToken),
  });
  const feedBack = await emailSent.json();

  return feedBack;
}
