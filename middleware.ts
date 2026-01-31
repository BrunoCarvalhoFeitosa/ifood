import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicPaths = ["/sign-in", "/sign-up", "/api/auth"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const token =
    req.cookies.get("__Secure-next-auth.session-token")?.value ??
    req.cookies.get("next-auth.session-token")?.value

  if (pathname.startsWith("/account") || pathname.startsWith("/api")) {
    if (!token) {
      const signInUrl = new URL("/sign-in", req.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/account/:path*", "/api/:path*"]
}
