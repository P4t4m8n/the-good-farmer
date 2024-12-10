import { APP_NAV_LINKS } from "@/constants/navLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { iconService } from "../Icons/Icons";

export default function AppNav() {
  const pathname = usePathname();
  const location = pathname.split("/")[2] || "/";

  return (
    <nav className="flex gap-8 font-title font-semibold text-white fill-gray-900 transition-opacity duration-500  ">
      {APP_NAV_LINKS.map((link) => (
        <Link
          href={link.href}
          key={link.text}
          className={` hover-underline-animation flex gap-1 flex-col items-center relative  ${
            location === link.icon ? " before:w-full " : ""
          }`}
        >
          {iconService.getSVGByName(link.icon, "h-8 w-8 fill-white ")}
          <h3>{link.text}</h3>
        </Link>
      ))}
    </nav>
  );
}
