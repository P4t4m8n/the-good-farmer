import Link from "next/link";
import { iconService } from "../Icons/Icons";

export default function Logo() {
  return (
    <Link
      key="home"
      href="/"
      className="flex items-center opacity-100 flex-col w-56 "
    >
      {iconService.LogoSvg({ style: "" })}
      <h3 className="font-title font-semibold text-lg ">The Happy farmer</h3>
    </Link>
  );
}
