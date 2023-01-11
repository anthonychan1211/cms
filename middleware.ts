import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  interface UserJwtPayload {
    jti: string;
    iat: number;
  }
  let token = req.cookies.get("jwt")?.value as string;
  if (req.url.includes("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(process.env.BASE_URI!);
    }

    try {
      console.log("run");
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      console.log(payload, 123);
    } catch (err) {
      console.log(err);
    }
  }
}
