import type { ReactElement } from "react";

import type { PreOrderBenefit } from "@/types/landing/home";
import PreOrderBenefitCard from "./PreOrderBenefitCard";

type PreOrderBenefitsGridProps = {
  benefits: PreOrderBenefit[];
};

function PreOrderBenefitsGrid({
  benefits,
}: PreOrderBenefitsGridProps): ReactElement {
  return (
    <div className="grid gap-6 [direction:rtl] sm:grid-cols-2 lg:grid-cols-4">
      {benefits.map((benefit) => (
        <PreOrderBenefitCard key={benefit.id} benefit={benefit} />
      ))}
    </div>
  );
}

export default PreOrderBenefitsGrid;
