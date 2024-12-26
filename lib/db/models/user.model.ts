import { Document } from "mongodb";

export interface IUserDocument extends Document {
    firstName: string; // required
    lastName: string; // required
    email: string; // required
    passwordHash?: string | null;
    googleId?: string | null;
    imgUrl?: string;
  }
  