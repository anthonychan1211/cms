import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import JWT from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  let token = req.cookies.get("jwt");

  if (!token && req.url.includes("/dashboard"))
    return NextResponse.redirect(process.env.BASE_URI!);
}
