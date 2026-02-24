import { Link } from "@/i18n/navigation";
import { NavItem } from "@/interfaces/navbar";
import { useTranslations } from "next-intl";
import type { ReactElement } from "react";

type DesktopNavProps = {
  items: NavItem[];
  pathname: string;
};

export default function DesktopNav({
  items,
  pathname,
}: DesktopNavProps): ReactElement {
  const t = useTranslations("nav");
  return (
    <nav className="hidden items-center lg:flex">
      <ul className="flex items-center gap-8 text-sm font-semibold text-slate-700">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-slate-700"
              }`}
            >
              {t(item.label)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
