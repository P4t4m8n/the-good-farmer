
interface IStreet {
  name: string;
  number: string;
  floor?: string;
  entrance?: string;
  apartment?: string;
}

interface IAddressBase {
  street: IStreet;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
}
declare interface IAddress extends IEntity, IAddressBase {
  userId: string;
}



declare interface IAddressFIlter {
  city?: string;
  userId?: string;
  _id?: string;
  skip?: number;
  limit?: number;
}
