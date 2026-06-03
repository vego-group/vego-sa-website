import type { ReactElement } from "react";

import type { HeroContent as HeroContentType } from "@/types/landing/home";
import HeroActions from "./HeroActions";
import HeroBadge from "./HeroBadge";
import HeroDescription from "./HeroDescription";
import HeroStats from "./HeroStats";
import HeroTitle from "./HeroTitle";

type HeroContentProps = {
  hero: HeroContentType;
};

function HeroContent({ hero }: HeroContentProps): ReactElement {
  return (
    <div className="relative z-10 mx-auto flex min-h-[calc(100svh-64px)] md:min-h-[calc(100svh-72px)] w-full max-w-7xl items-center px-6 py-16 sm:py-20">
      <div className="max-w-3xl text-right">
        <HeroBadge label={hero.badge} />
        <HeroTitle title={hero.title} />
        <HeroDescription description={hero.description} />

        <div className="mt-9">
          <HeroActions actions={hero.actions} />
        </div>

        <div className="mt-10">
          <HeroStats stats={hero.stats} />
        </div>
      </div>
    </div>
  );
}

export default HeroContent;
