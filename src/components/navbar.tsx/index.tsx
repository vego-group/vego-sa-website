"use client";

import Image from "next/image";
import { useState, type ReactElement } from "react";

import { usePathname } from "@/i18n/navigation";
import DesktopNav from "./DesktopNav";
import LanguageButton from "./LanguageButton";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";
import { navItems } from "@/data/navbar";
import { Button } from "../ui/button";

export default function Navbar(): ReactElement {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleScrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-white shadow">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Button
          type="button"
          aria-label="Scroll to top"
          onClick={handleScrollToTop}
          className="cursor-pointer"
        >
          <Image src="/images/logo.svg" alt="logo" width={90} height={90} />
        </Button>
        <DesktopNav items={navItems} pathname={pathname} />

        <div className="flex items-center gap-3">
          <LanguageButton className="hidden items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary lg:flex" />
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)} />
        </div>
      </div>

      {isMobileMenuOpen ? (
        <MobileMenu
          items={navItems}
          pathname={pathname}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      ) : null}
    </header>
  );
}
