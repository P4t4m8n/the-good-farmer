import { IEntity } from "./app";

export interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDtoCreate {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
  imgUrl?: string;
  googleId?: string;
  isAdmin?: boolean;
}
