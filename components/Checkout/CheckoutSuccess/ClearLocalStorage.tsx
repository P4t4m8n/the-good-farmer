"use client";

import { localStorageClientService } from "@/lib/services/client/localSession.service";

export default function ClearLocalStorage() {
  localStorageClientService.storeSessionData("cart");

  return null;
}
