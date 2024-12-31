"use client";

import { useModel } from "@/hooks/useModel";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useRef } from "react";
import Button from "./Button";
import AdminWrapper from "../Wrappers/AdminWrapper";

interface Props {
  menuItems: IMenu;
}

export default function GeneralMenu({ menuItems }: Props) {
  const modelRef = useRef(null);
  const [isOpen, setIsOpen] = useModel(modelRef);

  const { iconSvg, imgUrl, text, style } = menuItems.menuBtn;
  return (
    <div className="relative" ref={modelRef}>
      <Button
        styleMode="tertiary"
        styleSize="medium"
        className={style}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        {iconSvg && iconSvg}
        {imgUrl && (
          <Image
            src={imgUrl}
            width={32}
            height={32}
            alt={text || "menu button"}
          />
        )}
        <span>{text && text.charAt(0).toUpperCase() + text.slice(1)}</span>
      </Button>
      <ul className={`${isOpen ? "flex" : "hidden"} ${menuItems.menuStyle} `}>
        {menuItems.items.map((item, idx) => (
          <li key={idx}>{dynamicMenuItem({ setIsOpen, ...item })}</li>
        ))}
      </ul>
    </div>
  );
}

function dynamicMenuItem({
  setIsOpen,
  ...props
}: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> } & IMenuItem) {
  const handleClick = (e: MouseEvent, onClick: () => void) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(false);
    onClick();
  };
  const type = props.type;
  switch (type) {
    case "link":
      return (
        <Link href={props?.link || ""} className="w-full">
          <Button
            styleMode="none"
            styleSize="none"
            className={props.style}
            onClick={() => setIsOpen(false)}
          >
            <span>{props.text}</span>
            {props.iconSvg && props.iconSvg}
            {props.imgUrl && (
              <Image
                src={props.imgUrl}
                width={32}
                height={32}
                alt={props.text || "menu link"}
              />
            )}
          </Button>
        </Link>
      );
    case "btn":
      return (
        <Button
          styleMode="tertiary"
          styleSize="medium"
          className={props.style}
          onClick={(e) => handleClick(e, props.onClick!)}
        >
          <span>{props.text}</span>
          {props.iconSvg && props.iconSvg}
          {props.imgUrl && (
            <Image
              src={props.imgUrl}
              width={32}
              height={32}
              alt={props.text || "menu function"}
            />
          )}
        </Button>
      );
    case "adminLink":
      return (
        <AdminWrapper>
          <Link href={props?.link || ""} className="w-full">
            <Button
              styleMode="none"
              styleSize="none"
              className={props.style}
              onClick={() => setIsOpen(false)}
            >
              <span>{props.text}</span>
              {props.iconSvg && props.iconSvg}
              {props.imgUrl && (
                <Image
                  src={props.imgUrl}
                  width={32}
                  height={32}
                  alt={props.text || "menu link"}
                />
              )}
            </Button>
          </Link>
        </AdminWrapper>
      );
    case "adminBtn":
      return (
        <AdminWrapper>
          <Button
            styleMode="tertiary"
            styleSize="medium"
            className={props.style}
            onClick={(e) => handleClick(e, props.onClick!)}
          >
            <span>{props.text}</span>
            {props.iconSvg && props.iconSvg}
            {props.imgUrl && (
              <Image
                src={props.imgUrl}
                width={32}
                height={32}
                alt={props.text || "menu function"}
              />
            )}
          </Button>
        </AdminWrapper>
      );
    default:
      return null;
  }
}
