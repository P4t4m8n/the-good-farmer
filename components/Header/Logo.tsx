import Link from "next/link";
import { iconService } from "../Icons/Icons";

export default function Logo() {
  return (
    <Link
      key="home"
      href="/"
      className="flex items-center opacity-100 flex-col w-56 fill-gray-900"
    >
      {iconService.LogoSvg({ style: "" })}
      <h3 className="font-title font-semibold text-lg text-white">
        The Happy farmer
      </h3>
    </Link>
  );
}
