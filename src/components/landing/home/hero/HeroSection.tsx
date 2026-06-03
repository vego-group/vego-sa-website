import type { ReactElement } from "react";

import { landingHero } from "@/data/landing";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

function HeroSection(): ReactElement {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <HeroBackground alt={landingHero.image.alt} src={landingHero.image.src} />
      <HeroContent hero={landingHero} />
    </section>
  );
}

export default HeroSection;
