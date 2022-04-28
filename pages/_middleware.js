import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

// trigger at every page load to add /fr to the default language (not handled by next-translate)
export function middleware({ nextUrl }) {
  const changeLocaleValue = !PUBLIC_FILE.test(nextUrl.pathname) && !nextUrl.pathname.includes("/api/") && nextUrl.locale === "default";

  return changeLocaleValue ? NextResponse.redirect(`/fr${nextUrl.pathname}`) : null;
}
