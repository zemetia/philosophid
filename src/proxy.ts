import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwtPayload(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get('philosophid_session')?.value;
  const path = request.nextUrl.pathname;
  
  const isLoginPage = path.startsWith('/login');
  const isRegisterPage = path.startsWith('/register');
  const isProtectedPage = path.startsWith('/dashboard');

  let isRegistered = false;
  
  if (token) {
    const payload = decodeJwtPayload(token);
    if (payload && payload.isRegistered === true) {
      isRegistered = true;
    }
  }

  // 1. Unauthenticated users handling
  if (!token) {
    if (isRegisterPage || isProtectedPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // 2. Authenticated but INCOMPLETE users handling
  if (token && !isRegistered) {
    if (isLoginPage || isProtectedPage) {
      return NextResponse.redirect(new URL('/register', request.url));
    }
    return NextResponse.next();
  }

  // 3. Authenticated and COMPLETE users handling
  if (token && isRegistered) {
    if (isLoginPage || isRegisterPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*'],
};
