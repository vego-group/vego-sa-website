import type { ReactElement } from "react";

import type { LandingNavListProps } from "@/types/landing/navbar";
import NavbarScrollLink from "./NavbarScrollLink";

function DesktopNav({ items }: LandingNavListProps): ReactElement {
  return (
    <nav
      className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex"
      aria-label="Primary navigation"
    >
      <ul className="flex items-center gap-8 text-sm font-semibold text-white">
        {items.map((item) => (
          <li key={item.target}>
            <NavbarScrollLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default DesktopNav;
