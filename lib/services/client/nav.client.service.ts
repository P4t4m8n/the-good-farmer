const getActiveLocation = (pathname: string) => pathname.split("/")[2] || "/";

export const nacClientService = {
  getActiveLocation,
};
