import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const redirectURL = new URL('/', request.url)

  if (!token && !request.nextUrl.pathname.includes('/memories/public')) {
    return NextResponse.redirect(redirectURL)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
