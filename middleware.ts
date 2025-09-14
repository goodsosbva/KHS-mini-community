import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/sigin-in", "/sign-up", "/post-write"],
};

function middleware(request: NextRequest) {
  const sessionToken = request.cookies.getAll().find((cookie) => {
    return cookie.name === "next-auth.session-token";
  });
  const isAuthenticated = !!sessionToken;

  switch (request.nextUrl.pathname) {
    case "/sign-in":
    case "/sign-up":
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      break;
    case "/post-write":
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
      break;
  }

  return NextResponse.next();
}

export default middleware;
