import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// ✅ i18n middleware
const intlProxy = createMiddleware({
  ...routing,
  localeDetection: false,
});

export default intlProxy;

export const config = {
  matcher: ["/((?!api|_next|dashboard|.*\\..*).*)"],
};
