import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send("Unauthorized");
    return;
  }

  //   try {
  //     const token = authorization.replace("Bearer ", "");
  //     const decoded = jwt.verify(token, provess.env.JWT_SECRET);
  //     req.user = decoded;
  //     next();
  //   } catch (error) {
  //     res.status(401).send("Unauthorized");
  //   }
}
export const config = {
  matcher: ["/api/login"],
};
