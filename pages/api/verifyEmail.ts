import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import JWT from "jsonwebtoken";
import Cookies from "js-cookie";
const verifyEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const userToken = { userId: req.query.userId, token: req.query.token };
  const client = await clientPromise;
  const tokenCollection = client.db("cms-user").collection("token");
  //   check if the user exist and is the token correct
  const findUserByEmail = tokenCollection.findOne({
    userEmail: userToken.userId,
  });
  const tokenCorrect = tokenCollection.findOne({
    token: userToken.token,
  });
  if (!findUserByEmail) {
    return res.status(404).json({ Error: "User Not Found" });
  } else if (!tokenCorrect) {
    return res.status(400).json({ Error: "Invalid Link" });
  } else {
    // if both are correct, then delete the document in token-collection and verify the user in user-collection
    console.log("found token and user");
    const userCollection = client.db("cms-user").collection("user");
    await userCollection.updateOne(
      { email: userToken.userId },
      { $set: { verified: true } }
    );

    await tokenCollection.deleteOne({ token: userToken.token });
    // return res.status(200).json({ Sucess: "Email Verified" });
  }

  // create JWT and send it back the EmailVerifyingPage, use the frontend to add the token to client's browser
  const secret = process.env.JWT_SECRET as string;
  const jsToken = await JWT.sign({ userEmail: userToken.userId }, secret, {
    expiresIn: 30000000,
  });
  Cookies.set("jwt", jsToken, { httpOnly: true });

  res.status(200).json(jsToken);
};

export default verifyEmail;
