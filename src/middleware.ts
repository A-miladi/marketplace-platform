import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Exclude static assets from middleware processing
  if (
    pathname.startsWith("/assets") ||
    pathname.startsWith("/firebase-messaging-sw.js") ||
    pathname.startsWith("/sw.js") ||
    pathname.startsWith("/workbox-*.js") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already contains a locale
  const hasLocale = /^\/(en|de)(\/|$)/.test(pathname);

  if (!hasLocale) {
    // Try to get the user's preferred locale from cookies
    const cookies = request.cookies.get("NEXT_LOCALE");
    const preferredLocale = cookies?.value || "en"; // Default to 'en' if no preference

    // Redirect to the detected locale with the same query parameters
    const newUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
    newUrl.search = searchParams.toString(); // Preserve query params
    return NextResponse.redirect(newUrl);
  }

  // If the locale exists, continue with next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|sw.js|workbox-.*.js|firebase-messaging-sw.js|assets).*)",
  ],
};
