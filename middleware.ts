import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  interface UserJwtPayload {
    jti: string;
    iat: number;
  }
  let token = req.cookies.get("jwt")?.value as string;
  if (
    req.url == process.env.BASE_URI ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/sendEmail") ||
    pathname.startsWith("/api/signUp") ||
    pathname.startsWith("/api/verifyEmail")
  ) {
    return NextResponse.next();
  } else if (!token && req.url !== process.env.BASE_URI) {
    return NextResponse.redirect(req.nextUrl.origin);
  } else {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      if (!payload) {
        return NextResponse.redirect(process.env.BASE_URI!);
      }
    } catch (err) {
      console.log("run err");
      return NextResponse.redirect(process.env.BASE_URI!);
    }
  }
}

export const config = {
  matcher: "/:path*",
};
