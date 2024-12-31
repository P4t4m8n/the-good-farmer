import React from "react";
import { iconService } from "../Icons/Icons";
interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  numOfItems: number;
}
export default function CartBtn({ setIsOpen, numOfItems }: Props) {
  const STYLE = {
    btn: "w-16 h-16 py-2  stroke-light-btn dark:stroke-dark-btn fixed bg-orange-500 right-0 top-[50vh] z-50 cart-after",
    con: "w-full h-full relative",
    icon: "w-12 h-12",
    badge:
      "absolute -top-5 right-2 bg-light-btn dark:bg-dark-btn text-dark-text dark:text-light-text rounded-full w-6 text-sm font-semibold aspect-square flex items-center justify-center justify-items-center",
  };
  return (
    <button onClick={() => setIsOpen((prev) => !prev)} className={STYLE.btn}>
      <div className={STYLE.con}>
        {iconService.MiscellaneousSvg({
          className: STYLE.icon,
        })}
        <div className={STYLE.badge}>{numOfItems}</div>
      </div>
    </button>
  );
}
