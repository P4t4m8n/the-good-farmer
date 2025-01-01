import GeneralMenu from "@/components/General/GeneralMenu";
import { iconService } from "@/components/Icons/Icons";
import { useUser } from "@/hooks/useUser";
import { IMenu, IMenuBtn, IMenuItem } from "@/types/app";
import Link from "next/link";
import React from "react";

export default function UserMenu() {
  const { user, logout } = useUser();

  const btnStyle =
    "bg-light-btn dark:bg-dark-bg text-light-text dark:text-dark-text w-36 min-w-36 max-w-36 h-12 shadow-[0_0_0_1px_rgba(0,0,0,.7)] dark:shadow-light-text rounded-lg px-4 font-bold flex justify-center gap-4 items-center text-base truncate ";
  const getUserMenuItems = (): IMenu => {
    const menuBtn: IMenuBtn = {
      text:
        (user?.firstName || "").charAt(0).toUpperCase() +
        user?.firstName.slice(1),
      style: btnStyle,
    };

    const items: IMenuItem[] = [
      {
        text: "PROFILE",
        style:
          "flex justify-between items-center w-full border-b py-1 hover:text-dark-blue hover:font-semibold transition-all duration-300",
        link: "/profile",
        iconSvg: iconService.AvatarSvg(),
        type: "link",
      },
      {
        text: "ADMIN",
        style:
          "flex  justify-between items-center w-full border-b py-1 hover:text-dark-blue hover:font-semibold transition-all duration-300",
        link: "/admin",
        iconSvg: iconService.AdminSvg(),
        type: "adminLink",
      },
      {
        text: "LOGOUT",
        style:
          "flex justify-between items-center w-full  pt-1 hover:text-dark-blue hover:font-semibold transition-all duration-300 w-full",
        onClick: logout,
        iconSvg: iconService.LogoutSvg(),
        type: "btn",
      },
    ];

    return {
      menuBtn,
      items,
      menuStyle:
        "shadow-md flex-col p-4 rounded-md w-full bg-dark-bg absolute  top-14 shadow-[0_0_0_1px_rgba(0,0,0,.1)] dark:shadow-light-text",
    };
  };

  const menuItems = user ? getUserMenuItems() : null;

  if (!user) {
    return (
      <Link className={btnStyle} href="/signin">
        Sign-In
      </Link>
    );
  }
  return <GeneralMenu menuItems={menuItems!} />;
}
