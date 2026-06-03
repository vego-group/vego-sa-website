"use client";

import { X } from "lucide-react";
import type { ReactElement } from "react";

import type { LandingNavListProps } from "@/types/landing/navbar";
import NavbarBrand from "./NavbarBrand";
import NavbarScrollLink from "./NavbarScrollLink";

type MobileMenuProps = LandingNavListProps & {
  onClose: () => void;
};

function MobileMenu({ items, onClose }: MobileMenuProps): ReactElement {
  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="flex min-h-full flex-col border-l border-white/20  bg-primary px-6 pb-10 pt-3 shadow-2xl shadow-primary/20 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <NavbarBrand onClick={onClose} />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-sm backdrop-blur-md transition hover:bg-white/25"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav className="mt-10 flex-1" aria-label="Page navigation">
          <ul className="flex flex-col gap-6 text-base font-semibold text-white">
            {items.map((item) => (
              <li key={item.target}>
                <NavbarScrollLink item={item} onClick={onClose} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
