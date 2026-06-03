"use client";

import { ArrowLeft } from "lucide-react";
import type { ReactElement } from "react";
import { Link as ScrollLink } from "react-scroll";

import type { HeroContent } from "@/types/landing/home";

type HeroActionsProps = {
  actions: HeroContent["actions"];
};

function HeroActions({ actions }: HeroActionsProps): ReactElement {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ScrollLink
        to={actions.primary.target}
        smooth
        duration={500}
        offset={-84}
        className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-secondary px-6 text-sm font-bold text-primary shadow-xl shadow-secondary/25 transition hover:bg-secondary/90"
      >
        {actions.primary.label}
        <ArrowLeft aria-hidden="true" className="size-5" />
      </ScrollLink>
      <ScrollLink
        to={actions.secondary.target}
        smooth
        duration={500}
        offset={-84}
        className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
      >
        {actions.secondary.label}
      </ScrollLink>
    </div>
  );
}

export default HeroActions;
