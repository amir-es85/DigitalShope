// proxy.ts
import { NextResponse } from "next/server";
import { auth } from "../auth";

export default auth((req) => {
  const nextUrl = req.nextUrl;
  console.log("🚀 Proxy executed for:", nextUrl.pathname);

  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";

  if (!isLoggedIn) {
    console.log("🔴 Not logged in → redirect to /auth");
    return NextResponse.redirect(new URL("/auth", nextUrl));
  }

  if (!isAdmin) {
    console.log("🔴 User role → redirect to /unauthorized");
    return NextResponse.redirect(new URL("/auth", nextUrl));
  }

  console.log("🟢 Admin → allowed");
  return NextResponse.next();
});

export const config = {
matcher: ["/dashbord/:path*"],
};