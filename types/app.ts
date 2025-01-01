import { JSX } from "react";

export interface IEntity {
  _id?: string;
}

export interface IMenuItem extends IMenuBtn {
  onClick?: () => void;
  link?: string;
  type: "link" | "btn" | "authLink" | "authBtn" | "adminLink" | "adminBtn";
}

export interface IMenuBtn {
  text?: string;
  iconSvg?: JSX.Element;
  imgUrl?: string;
  style: string;
}

export interface IMenu {
  menuBtn: IMenuBtn;
  menuStyle: string;
  items: IMenuItem[];
}

export type TStyleMode = "card" | "cart";
