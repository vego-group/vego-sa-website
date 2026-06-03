"use client";

import { Link as ScrollLink } from "react-scroll";
import type { ReactElement } from "react";

function NavbarCtaButton(): ReactElement {
  return (
    <ScrollLink
      to="contact"
      smooth
      duration={500}
      offset={-84}
      className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-secondary px-5 text-sm font-bold text-primary shadow-lg shadow-secondary/20 transition hover:bg-secondary/90"
    >
      احجز الآن
    </ScrollLink>
  );
}

export default NavbarCtaButton;
