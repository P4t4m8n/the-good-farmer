"use client";

import Logo from "./Logo";
import AppNav from "./AppNav";
import Cart from "../Cart/Cart";
import UserMenu from "../User/UserMenu/UserMenu";

export default function Header() {
  return (
    <>
      <header className="fixed bg-inherit top-0 left-0  w-full  z-40 h-32  p-4  justify-between flex items-end shadow">
        <Logo />
        <AppNav />
        <UserMenu />

        <Cart />
      </header>
    </>
  );
}
