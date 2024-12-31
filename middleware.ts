import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authServerService } from "./lib/services/server/auth.server.service";

export async function middleware(request: NextRequest) {
  // const prefersDark =
  // request.headers.get("sec-ch-prefers-color-scheme") === "dark";
  const session = request.cookies.get("session");
  const value = session?.value;
  if (!value) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
  if (request.nextUrl.pathname.includes("/admin")) {
    const decode = await authServerService.decodeToken(value);
    if (!decode.isAdmin) {
      console.log("decode:", decode);
      return NextResponse.redirect(new URL("/signin", request.nextUrl));
    }
    console.log("decode:", decode);
  }
  //   response.headers.set("content-type", "text/html");
  //   response.cookies.set("theme", prefersDark ? "dark" : "light");
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
