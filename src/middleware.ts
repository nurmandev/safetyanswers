import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
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

  const isStaticAsset = pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.startsWith("/images") || pathname === "/favicon.ico";
  if (isStaticAsset) {
    return NextResponse.next();
  }

  const isPublic = publicRoutes.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );
  const isUserRoute = userRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (!isUserRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  if (isUserRoute) {
    try {
      const response = await fetch(`${API_BASE}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        return NextResponse.next();
      }
    } catch {}

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute) {
    const isAdminPublic = adminPublicRoutes.some((route) => pathname.startsWith(route));
    if (isAdminPublic) {
      return NextResponse.next();
    }

    try {
      const response = await fetch(`${API_BASE}/admin/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        return NextResponse.next();
      }
    } catch {}

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
