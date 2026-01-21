import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ReactElement } from "react";
import { NavItem } from "@/interfaces/navbar";
import LanguageButton from "./LanguageButton";

type MobileMenuProps = {
  items: NavItem[];
  pathname: string;
  onClose: () => void;
};

export default function MobileMenu({
  items,
  pathname,
  onClose,
}: MobileMenuProps): ReactElement {
  return (
    <div className="fixed inset-0 z-50 bg-primary/20 backdrop-blur-sm lg:hidden">
      <div className="flex min-h-full flex-col bg-slate-50 px-6 pb-10 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={90}
              height={90}
              className="h-12 w-12 md:h-20 md:w-20"
            />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-primary"
            aria-label="Close menu"
            onClick={onClose}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
              <path
                d="M6 6l12 12M18 6l-12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-10 flex-1">
          <ul className="flex flex-col gap-6 text-base font-semibold text-slate-700">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-slate-700"
                  }`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageButton
          label="العربية"
          className="mt-8 flex items-center justify-center gap-2 rounded-full border border-primary px-4 py-3 text-sm font-semibold text-primary"
        />
      </div>
    </div>
  );
}
