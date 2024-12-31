declare interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  email: string;
  imgUrl?: string;
  phone?: string;
  password?: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface IUserDtoCreate {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  imgUrl?: string;
  googleId?: string;
  isAdmin?: boolean;
}
