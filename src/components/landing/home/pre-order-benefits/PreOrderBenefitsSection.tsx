import type { ReactElement } from "react";

import { landingPreOrderBenefits } from "@/data/landing";
import PreOrderBenefitsGrid from "./PreOrderBenefitsGrid";
import PreOrderBenefitsHeader from "./PreOrderBenefitsHeader";

function PreOrderBenefitsSection(): ReactElement {
  return (
    <section
      id="pre-order-benefits"
      className="relative isolate overflow-hidden bg-[#00091f] ps-6 pe-6 py-20 sm:py-24 lg:py-36"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_17%_50%,rgba(0,123,181,0.2),transparent_34%),radial-gradient(circle_at_82%_53%,rgba(16,20,75,0.64),transparent_36%),linear-gradient(135deg,#00111f_0%,#00091f_45%,#03001f_100%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 sm:gap-16 lg:gap-20">
        <PreOrderBenefitsHeader content={landingPreOrderBenefits} />
        <PreOrderBenefitsGrid benefits={landingPreOrderBenefits.benefits} />
      </div>
    </section>
  );
}

export default PreOrderBenefitsSection;
