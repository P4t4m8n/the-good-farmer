import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import xss from "xss";

const formDataToUserDTO = (formData: FormData): IUserDtoCreate => {
  const email = xss(formData.get("email")?.toString() || "");
  const password = xss(formData.get("password")?.toString() || "");
  const firstName = xss(formData.get("firstName")?.toString() || "");
  const lastName = xss(formData.get("lastName")?.toString() || "");
  const imgUrl = xss(formData.get("imgUrl")?.toString() || "");
  const googleId = xss(formData.get("googleId")?.toString() || "");
  const returnedData: IUserDtoCreate = {
    email,
    password,
    firstName,
    lastName,
    imgUrl: imgUrl || "/imgs/avatarDefault.svg",
    googleId,
  };

  return returnedData;
};

const getEmpty = (): IUser => {
  return {
    email: "",
    firstName: "",
    _id: "",
    imgUrl: "",
    lastName: "",
  };
};

const decodeToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);

  return payload;
};

const createCookie = async (token: string) => {
  const _cookies = await cookies();
  _cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 24 hours
  });
};

const createJWT = async (userId: string, isAdmin: boolean) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return new SignJWT({ userId, isAdmin })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);
};

export const authServerService = {
  formDataToUserDTO,
  getEmpty,
  decodeToken,
  createCookie,
  createJWT,
};
