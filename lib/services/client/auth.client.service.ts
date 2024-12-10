import { apiClientService } from "./api.client.service";
const BASE_URL = "auth/";

const logout = async (): Promise<void> => {
  return await apiClientService.post(BASE_URL + "logout");
};

const getSession = async (): Promise<IUser | null> => {
  return await apiClientService.get<IUser | null>(BASE_URL + "session-user");
};

export const authClientService = {
  logout,
  getSession,
};
