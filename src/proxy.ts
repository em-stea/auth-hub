import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "./shared/lib/route";

const SESSION_COOKIES = ["authjs.session-token", "__Secure-authjs.session-token"] as const;

export function proxy(request: NextRequest) {
  const hasSession = SESSION_COOKIES.some((name) => request.cookies.has(name));
  const { pathname } = request.nextUrl;

  if (pathname === ROUTES.home && !hasSession) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
