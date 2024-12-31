import { Document } from "mongodb";

export interface IUserDocument extends Document {
  firstName: string; // required
  lastName: string; // required
  email: string; // required
  passwordHash?: string | null; // required if no googleId
  googleId?: string | null; // required if no passwordHash
  imgUrl?: string;
  isAdmin?: boolean;
}
