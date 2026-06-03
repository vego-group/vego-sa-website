import type { LucideIcon } from "lucide-react";
import { CreditCard, Flame, ShieldCheck, Zap } from "lucide-react";
import type { ReactElement } from "react";

import type { PreOrderBenefit } from "@/types/landing/home";

type PreOrderBenefitCardProps = {
  benefit: PreOrderBenefit;
};

const benefitIcons: Record<PreOrderBenefit["icon"], LucideIcon> = {
  zap: Zap,
  shield: ShieldCheck,
  flame: Flame,
  card: CreditCard,
};

function PreOrderBenefitCard({
  benefit,
}: PreOrderBenefitCardProps): ReactElement {
  const Icon = benefitIcons[benefit.icon];

  return (
    <article className="group flex min-h-60 flex-col items-center justify-center rounded-2xl border border-white/12 bg-white/[0.045] ps-7 pe-7 py-8 text-center shadow-[0_26px_70px_rgba(0,0,0,0.18)] backdrop-blur-sm transition duration-300 hover:border-secondary/35 hover:bg-white/[0.065] sm:min-h-64">
      <div className="mb-7 flex size-14 items-center justify-center rounded-2xl bg-secondary/12 text-secondary ring-1 ring-secondary/10 transition duration-300 group-hover:bg-secondary/18 group-hover:ring-secondary/25">
        <Icon aria-hidden="true" className="size-7" strokeWidth={2.2} />
      </div>

      <h3 className="text-2xl font-black leading-tight text-white sm:text-[1.6rem]">
        {benefit.title}
      </h3>

      <p className="mt-5 max-w-56 text-sm font-light leading-7 text-white/55">
        {benefit.description}
      </p>
    </article>
  );
}

export default PreOrderBenefitCard;
