import React from "react";
import { iconService } from "../Icons/Icons";
interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  numOfItems: number;
}
export default function CartBtn({ setIsOpen, numOfItems }: Props) {
  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="w-12 h-12 relative"
    >
      {iconService.BasketSvg({
        className: "w-12 h-12 fill-none stroke-white border p-2 rounded",
      })}
      <div className=" absolute -top-2 -right-2 bg-white text-black rounded-full w-6 text-sm font-semibold aspect-square flex items-center justify-center justify-items-center">
        {numOfItems}
      </div>
    </button>
  );
}
