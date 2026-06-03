import type { ReactElement } from "react";

import { landingBrandVision } from "@/data/landing";
import BrandVisionContent from "./BrandVisionContent";
import BrandVisionStats from "./BrandVisionStats";

function BrandVisionSection(): ReactElement {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#00091f] px-6 py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_57%,rgba(0,123,181,0.16),transparent_30%),radial-gradient(circle_at_82%_52%,rgba(15,24,78,0.52),transparent_35%),linear-gradient(135deg,#00101c_0%,#00091f_46%,#050021_100%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
        <BrandVisionContent content={landingBrandVision} />
        <BrandVisionStats stats={landingBrandVision.stats} />
      </div>
    </section>
  );
}

export default BrandVisionSection;
