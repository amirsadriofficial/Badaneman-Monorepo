import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin-session";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (username === "admin" && password === "admin123") {
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
