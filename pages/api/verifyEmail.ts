import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import JWT from "jsonwebtoken";
import cookie from "cookie";

const verifyEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, token, purpose } = req.query;
  console.log(purpose);
  const client = await clientPromise;
  const tokenCollection = client.db("cms-user").collection("token");
  //   check if the user exist and is the token correct
  const tokenCorrect = tokenCollection.findOne({
    token,
  });
  const user = await client
    .db("cms-user")
    .collection("user")
    .findOne({ email });
  if (!user) {
    return res.status(404).json({ Error: "User Not Found" });
  } else if (!tokenCorrect) {
    return res.status(400).json({ Error: "Invalid Link" });
  } else {
    if (purpose === "register") {
      console.log(token);
      // if both are correct, then delete the document in token-collection and verify the user in user-collection
      await client
        .db("cms-user")
        .collection("user")
        .updateOne({ email }, { $set: { verified: true } });
      await tokenCollection.deleteOne({ token });
    } else if (purpose === "changepassword") {
      const newPassword = user.unverifiedNewPassword;
      await tokenCollection.deleteOne({ token });

      await client
        .db("cms-user")
        .collection("user")
        .updateOne({ email }, { $set: { password: newPassword } });

      await client
        .db("cms-user")
        .collection("user")
        .updateOne({ email }, { $unset: { unverifiedNewPassword: "" } });
    }
  }

  // create JWT and send it back the EmailVerifyingPage, use the frontend to add the token to client's browser
  const secret = process.env.JWT_SECRET as string;
  const jsToken = JWT.sign({ email }, secret, {
    expiresIn: 30000000,
  });
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", jsToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    })
  );
  res.status(200).send("Email is verified");
};

export default verifyEmail;
