export const dynamic = "force-dynamic";

import { signOut } from "@/lib/actions/auth.actions";
import { AppError } from "@/lib/services/utils/AppError.server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await signOut();
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error: unknown) {
    const err = AppError.create(`Error signing out${error}`, 500, true);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode }
    );
  }
}
