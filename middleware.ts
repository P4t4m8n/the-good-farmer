import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("request:", request)
  // const prefersDark =
  // request.headers.get("sec-ch-prefers-color-scheme") === "dark";

  const response = NextResponse.next();
//   response.headers.set("content-type", "text/html");
//   response.cookies.set("theme", prefersDark ? "dark" : "light");
  return response;
}
