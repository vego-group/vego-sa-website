import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlProxy = createMiddleware(routing);

const unlocalizedPublicRoutes = ["/landing", "/deposit"];

function isRouteMatch(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function removeLocalePrefix(pathname: string) {
  const locale = routing.locales.find((locale) =>
    pathname.startsWith(`/${locale}/`)
  );

  if (!locale) {
    return pathname;
  }

  return pathname.replace(`/${locale}`, "") || "/";
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isRouteMatch(pathname, unlocalizedPublicRoutes)) {
    return NextResponse.next();
  }

  const pathnameWithoutLocale = removeLocalePrefix(pathname);

  if (isRouteMatch(pathnameWithoutLocale, unlocalizedPublicRoutes)) {
    const url = req.nextUrl.clone();
    url.pathname = pathnameWithoutLocale;
    return NextResponse.redirect(url);
  }

  // Dashboard guard
  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("token")?.value;
    const isLogin =
      pathname === "/dashboard/login" ||
      pathname.startsWith("/dashboard/login/");

    if (token && isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (!token && !isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Public localized site routes use next-intl.
  return intlProxy(req);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
