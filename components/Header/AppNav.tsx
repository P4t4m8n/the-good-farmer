import Link from "next/link";
import { APP_NAV_LINKS } from "@/constants/navLinks";
import { usePathname } from "next/navigation";
import { iconService } from "../Icons/Icons";
import { nacClientService } from "@/lib/services/client/nav.client.service";

export default function AppNav() {
  const pathname = usePathname();
  const location = nacClientService.getActiveLocation(pathname);

  const STYLE = {
    nav: "flex gap-8 font-title font-semibold transition-opacity duration-500 ",
    link: "hover-underline-animation flex gap-1 flex-col items-center relative before:bg-light-text before:dark:bg-dark-text",
    icon: "h-8 w-8 fill-current",
  };

  return (
    <nav className={STYLE.nav}>
      {APP_NAV_LINKS.map((link) => (
        <Link
          aria-label={link.text}
          href={link.href}
          key={link.text}
          className={`${STYLE.link} ${location === link.icon ? "before:w-full" : ""} `}
        >
          {iconService.getSVGByName(link.icon,STYLE.icon)}
          <h3>{link.text}</h3>
        </Link>
      ))}
    </nav>
  );
}
