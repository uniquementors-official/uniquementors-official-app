import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: authSecret
  });

  if (!token || token.role !== "ADMIN") {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
