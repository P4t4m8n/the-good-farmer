import GeneralMenu from "@/components/General/GeneralMenu";
import { iconService } from "@/components/Icons/Icons";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UserMenu() {
  const { user, logout } = useUser();

  const btnStyle =
    "w-36 min-w-36 max-w-36 h-12 border shadow-lg text-blue rounded-lg px-4 font-bold flex justify-center gap-4 items-center  text-base truncate ";
  const getUserMenuItems = (): IMenu => {
    const menuBtn: IMenuBtn = {
      text: user?.firstName,
      style: btnStyle + " flex-row-reverse",
      imgUrl: user?.imgUrl || "imgs/avatarDefault.svg",
    };

    const items: IMenuItem[] = [
      {
        text: "PROFILE",
        style:
          " flex justify-between items-center border-b py-1 hover:text-dark-blue hover:font-semibold transition-all duration-300",
        link: "/profile",
        imgUrl: user?.imgUrl,
      },
      {
        text: "LOGOUT",
        style:
          " flex justify-between items-center  pt-1 hover:text-dark-blue hover:font-semibold transition-all duration-300 w-full",
        onClick: logout,
        iconSvg: iconService.LogoutSvg(),
      },
    ];

    return {
      menuBtn,
      items,
      menuStyle: "bg-white shadow-md flex-col p-4  rounded-md w-full absolute",
    };
  };

  const menuItems = user ? getUserMenuItems() : null;

  if (!user) {
    return (
      <Link className={btnStyle} href="/signin">
        <span>Sign-In</span>
        <Image
          src="/imgs/avatarDefault.svg"
          width={32}
          height={32}
          alt="avatar"
        />
      </Link>
    );
  }
  return <GeneralMenu menuItems={menuItems!} />;
}
