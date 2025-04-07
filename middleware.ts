import { NextRequest, NextResponse } from "next/server";

import ROUTES from "./routes";
import { SKIP_AUTH } from "./utils";

export const middleware = (request: NextRequest) => {
  const cookies = request.cookies;
  const url = new URL(request.url);
  const path = url.pathname;

  const isPublicPath = Object.values(ROUTES).find((route) => {
    return route.path === path;
  })?.public;

  const userRole = cookies.get("USER_ROLE")?.value;

  if (!userRole && !isPublicPath && !Number(SKIP_AUTH)) {
    return NextResponse.redirect(new URL(ROUTES["AUTH"].path, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/.*|video/.*|manifest.webmanifest).*)",
  ],
};
