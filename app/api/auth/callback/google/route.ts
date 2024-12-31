import { signIn, signUp } from "@/lib/actions/auth.actions";
import { AppError } from "@/lib/services/utils/AppError.server";
import { NextResponse, NextRequest } from "next/server";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = "http://localhost:3000/api/auth/callback/google";

export async function GET(req: NextRequest) {
  const url = new URL(req?.url);
  const code = url?.searchParams?.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code is missing" },
      { status: 400 }
    );
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to fetch access token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch user information
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      throw new Error("Failed to fetch user information");
    }

    const userInfo = await userInfoResponse.json();
    const fromData = new FormData();
    fromData.append("email", userInfo.email);
    fromData.append("firstName", userInfo.given_name);
    fromData.append("lastName", userInfo.family_name);
    fromData.append("imgUrl", userInfo.picture);
    fromData.append("googleId", userInfo.id);

    try {
      await signIn({}, fromData);
    } catch (error) {
      if (error instanceof AppError && error.statusCode === 404) {
        // User not found, attempt to sign up
        await signUp({}, fromData);
      } else {
        // Other errors
        throw error;
      }
    }

    const url = new URL("/", req.nextUrl);
    return NextResponse.redirect(url);
  } catch (error) {
    url.pathname = "/error";
    const response = NextResponse.redirect(url);
    response.cookies.set("errorMessage", `${error}`, {
      path: "/error",
      maxAge: 60,
    });
    return response;
  }
}
