import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // All matched routes are now protected.
        // If user is not signed in, next-auth/middleware automatically
        // redirects them to the signIn page. We just return next() here.
        return NextResponse.next();
    },
    {
        callbacks: {
            // Returning true allows access, false triggers redirect to login
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login",
        },
    }
);

// Define which routes require authentication
export const config = {
    matcher: [
        // Course detail pages (not the listing page)
        "/courses/:id+",
        // Student dashboard
        "/dashboard/:path*",
        // Checkout pages
        "/checkout/:path*",
    ],
};
