import { ADMIN_NAV_LINKS } from "@/constants/navLinks";
import Link from "next/link";

export default function AdminNav() {
  return (
    <nav className=" grid grid-cols-2 grid-rows-2 gap-4 justify-items-center">
      {ADMIN_NAV_LINKS.map((link) => (
        <Link
          className="bg-dark-btn dark:bg-light-btn text-light-text dark:text-dark-text w-72 aspect-square "
          key={link.text}
          href={link.href}
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
}
