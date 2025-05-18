import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simple middleware example
// In a real application, you would check the session/JWT
// and redirect unauthenticated users
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with /admin
  if (pathname.startsWith('/admin')) {
    // This is where you would validate the user's session
    // For demo purposes, we're allowing all access
    
    // In a real app, you would do something like:
    // const isAuthenticated = validateSession(request);
    // if (!isAuthenticated) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};