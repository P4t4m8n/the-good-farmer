export const dynamic = "force-dynamic";

import { getSessionUser } from "@/lib/actions/auth.actions";
import { AppError } from "@/lib/services/utils/AppError.server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getSessionUser();

    return NextResponse.json(user);
  } catch (error) {
    const err = AppError.create(`${error}`, 500, false);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode }
    );
  }
}
