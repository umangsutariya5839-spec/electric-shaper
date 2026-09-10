import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAuth = request.cookies.has('admin_session')
  const role = request.cookies.get('admin_session')?.value

  if (path === '/login') {
    if (isAuth && role === 'SUPER_ADMIN') return NextResponse.redirect(new URL('/admin', request.url))
    if (isAuth && role === 'SHOP_OWNER') return NextResponse.redirect(new URL('/owner', request.url))
    return NextResponse.next()
  }

  if (path.startsWith('/admin')) {
    if (!isAuth || role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (path.startsWith('/owner')) {
    if (!isAuth || role !== 'SHOP_OWNER') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/owner/:path*', '/login'],
}
