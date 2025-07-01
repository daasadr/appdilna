import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Z homepage uživatele NEREDIRECTUJEME na dashboard
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/dashboard") || 
            req.nextUrl.pathname.startsWith("/apps/create")) {
          return !!token
        }
        return true
      },
    },
  }
)

// Nastavení, které cesty mají být chráněné
export const config = {
  matcher: ['/dashboard/:path*', '/apps/create']
} 