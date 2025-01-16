import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
	const hasAuthenticatedCookie = request.cookies.get('surfenotes-id');

	if (request.nextUrl.pathname === '/' && hasAuthenticatedCookie) {
		return NextResponse.redirect(
			new URL(`/dashboard/${hasAuthenticatedCookie.value}`, request.url)
		);
	}

	if (request.nextUrl.pathname === '/' && !hasAuthenticatedCookie) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (
		request.nextUrl.pathname.includes('dashboard') &&
		!hasAuthenticatedCookie
	) {
		return NextResponse.redirect(new URL('/error', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/dashboard:path', '/error'],
};
