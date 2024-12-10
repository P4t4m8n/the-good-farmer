declare interface IEntity {
  _id?: string;
}

declare interface IMenuItem extends IMenuBtn {
  onClick?: () => void;
  link?: string;
}

declare interface IMenuBtn {
  text?: string;
  iconSvg?: JSX.Element;
  imgUrl?: string;
  style: string;
}

declare interface IMenu {
  menuBtn: IMenuBtn;
  menuStyle: string;
  items: IMenuItem[];
}


