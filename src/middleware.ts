import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/",
  "/about",
  "/services",
  "/blog",
  "/pricing",
  "/contact",
  "/resources",
];

const userRoutes = [
  "/account",
  "/account/profile",
  "/account/settings",
  "/account/purchased",
  "/account/bookings",
  "/account/payments",
  "/account/downloads",
  "/account/notifications",
  "/account/support",
  "/account/messages",
  "/book",
];

const adminRoutes = [
  "/admin",
];

const adminPublicRoutes = [
  "/admin/login",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico";

  if (isStaticAsset) {
    return NextResponse.next();
  }

  const isUserRoute = userRoutes.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (!isUserRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  // User routes: rely on client-side AuthProvider for session verification.
  // The middleware cannot access backend cookies (httpOnly, cross-domain)
  // from the Edge Runtime, so server-side token refresh checks are not possible.
  // AccountLayout performs client-side auth guards and redirects.
  if (isUserRoute) {
    return NextResponse.next();
  }

  if (isAdminRoute) {
    const isAdminPublic = adminPublicRoutes.some((route) => pathname.startsWith(route));
    if (isAdminPublic) {
      return NextResponse.next();
    }

    // Admin routes: same cross-domain cookie issue applies.
    // Rely on client-side AdminAuthProvider for session verification.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
