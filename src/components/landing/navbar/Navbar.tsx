"use client";

import { useState, type ReactElement } from "react";
import { scroller } from "react-scroll";

import { landingNavItems } from "@/data";
import type { LandingNavbarProps } from "@/types/landing/navbar";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import NavbarBrand from "./NavbarBrand";
import NavbarCtaButton from "./NavbarCtaButton";

function Navbar({ items = landingNavItems }: LandingNavbarProps): ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToHome = (): void => {
    scroller.scrollTo("home", {
      duration: 500,
      offset: -84,
      smooth: true,
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white/20 bg-white/10 shadow-lg shadow-primary/10 backdrop-blur-xl">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
        <NavbarBrand onClick={scrollToHome} />
        <DesktopNav items={items} />
        <div className="flex items-center gap-3">
          <NavbarCtaButton />
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)} />
        </div>
      </div>

      {isMobileMenuOpen ? (
        <MobileMenu items={items} onClose={() => setIsMobileMenuOpen(false)} />
      ) : null}
    </header>
  );
}

export default Navbar;
