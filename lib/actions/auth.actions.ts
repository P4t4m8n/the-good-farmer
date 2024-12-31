"use server";

import bcrypt from "bcrypt";
import DatabaseService from "../db/db";
import { cookies } from "next/headers";
import { getUserById } from "./user.actions";
import { IUserDocument } from "../db/models/user.model";
import { authServerService } from "../services/server/auth.server.service";
import { AppError } from "../services/utils/AppError.server";

export const signIn = async (
  _: unknown,
  formData: FormData
): Promise<IUser> => {
  try {
    const { email, password, googleId } =
      authServerService.formDataToUserDTO(formData);

    if (!email || (!password && !googleId)) {
      throw AppError.create("Missing credentials", 400, true);
    }

    const userCollection = await DatabaseService.getCollection<IUserDocument>(
      "users"
    );

    const user = await userCollection.findOne({ email });

    if (!user || !user?.email || !user?._id) {
      throw AppError.create("User not found", 404, true);
    }

    if (user.passwordHash && password) {
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        throw AppError.create("Invalid credentials", 401, true);
      }
    } else if (user?.googleId && googleId && user.googleId !== googleId) {
      throw AppError.create("Invalid credentials", 401, true);
    }
    const _id = user._id.toString();
    const isAdmin = user.isAdmin || false;

    const token = await authServerService.createJWT(_id, isAdmin);

    await authServerService.createCookie(token);
    delete user.passwordHash;
    return { ...user, _id };
  } catch (error) {
    throw error;
  }
};

export const signUp = async (
  _: unknown,
  formData: FormData
): Promise<IUser> => {
  try {
    const userData = authServerService.formDataToUserDTO(formData);
    const saltRounds = 10;
    const { email, password, googleId, firstName, lastName } = userData;
    if (!email || (!password && !googleId) || !firstName || !lastName) {
      throw new Error("missing credentials");
    }
    const userCollection = await DatabaseService.getCollection<IUserDocument>(
      "users"
    );

    const existingUser = await userCollection.findOne({
      email,
    });
    if (existingUser) {
      throw new Error("User already exists");
    }

    let hash = null;
    let _googleId = null;
    if (password) {
      hash = await bcrypt.hash(password, saltRounds);
    } else if (googleId) {
      _googleId = googleId;
    }
    delete userData.password;

    const user = await userCollection.insertOne({
      ...userData,
      passwordHash: hash,
      googleId: _googleId,
    });

    if (!user.acknowledged) {
      throw new Error("Error creating user");
    }

    const _id = user.insertedId.toString();

    const token = await authServerService.createJWT(_id, false);

    await authServerService.createCookie(token);

    return { ...userData, _id };
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};

export const signOut = async (): Promise<void> => {
  try {
    const _cookies = await cookies();

    _cookies.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      expires: new Date(0),
    });
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};

export const getSessionUser = async (): Promise<IUser | null> => {
  try {
    const token = (await cookies()).get("session")?.value;

    if (!token) {
      return null;
    }

    const payload = await authServerService.decodeToken(token);

    const user = await getUserById(payload.userId as string);

    return user;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
