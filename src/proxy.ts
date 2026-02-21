import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Dashboard guard
  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("token")?.value;
    const isLogin =
      pathname === "/dashboard/login" ||
      pathname.startsWith("/dashboard/login/");

    // 1) لو معاه token: امنعي /dashboard/login
    if (token && isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // 2) لو مش معاه token: امنعي أي dashboard route غير login
    if (!token && !isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard/login";
      return NextResponse.redirect(url);
    }

    // يسمح بالوصول: (token موجود لأي dashboard) أو (login بدون token)
    return NextResponse.next();
  }

  // ✅ باقي الموقع public + next-intl شغال
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
