"use client";

import { localStorageClientService } from "@/lib/services/client/localSession.service";
import { useEffect } from "react";

export const useClearStorage = () => {
  useEffect(() => {
    localStorageClientService.storeSessionData("cart");
  }, []);
  return null;
};
