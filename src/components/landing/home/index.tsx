import type { ReactElement } from "react";

import BrandVisionSection from "./brand-vision";
import CollectionSection from "./collection";
import HeroSection from "./hero";
import ImmersiveTechnologySection from "./immersive-technology";
import MyVegoAppSection from "./my-vego-app";
import OwnersSection from "./owners";
import PreOrderSection from "./pre-order";
import PreOrderBenefitsSection from "./pre-order-benefits";
import PreOrderJourneySection from "./pre-order-journey";

function LandingHome(): ReactElement {
  return (
    <>
      <HeroSection />
      <PreOrderSection />
      <MyVegoAppSection />
      <BrandVisionSection />
      <CollectionSection />
      <PreOrderBenefitsSection />
      <ImmersiveTechnologySection />

      <PreOrderJourneySection />
      <OwnersSection />
    </>
  );
}

export default LandingHome;
