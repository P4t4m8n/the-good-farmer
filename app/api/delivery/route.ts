import { deliveryClientService } from "@/lib/services/client/delivery.client.service";
import { AppError } from "@/lib/services/utils/AppError.server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const city = searchParams.get("city");

    const deliveries = deliveryClientService.getDeliveryDates({
      city: city || "",
    });
    return NextResponse.json(deliveries, { status: 200 });
  } catch (error) {
    const err = AppError.create(
      `Error getting delivery dates ${error}`,
      500,
      true
    );
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode }
    );
  }
}
