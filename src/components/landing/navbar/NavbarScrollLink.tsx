"use client";

import { Link as ScrollLink } from "react-scroll";
import type { ReactElement } from "react";

import type { LandingNavLinkProps } from "@/types/landing/navbar";

function NavbarScrollLink({
  item,
  onClick,
}: LandingNavLinkProps): ReactElement {
  return (
    <ScrollLink
      to={item.target}
      spy
      smooth
      duration={500}
      offset={-84}
      activeClass="text-secondary"
      className="cursor-pointer transition-colors hover:text-secondary"
      onClick={onClick}
    >
      {item.label}
    </ScrollLink>
  );
}

export default NavbarScrollLink;
