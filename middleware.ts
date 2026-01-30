import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicPaths = ["/sign-in", "/sign-up", "/api/auth"]

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value
  const { pathname } = req.nextUrl

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  if (
    pathname.startsWith("/account") ||
    (pathname.startsWith("/api") && !pathname.startsWith("/api/auth"))
  ) {
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
