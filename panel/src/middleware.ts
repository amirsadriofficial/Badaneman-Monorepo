import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("admin-session");
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/login";
  const isAuthenticated = session?.value === "authenticated";

  if (!isAuthenticated && !isLoginPage && pathname !== "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && (isLoginPage || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
};
