import type { ReactElement } from "react";

import type { BrandVisionStat } from "@/types/landing/home";

type BrandVisionStatCardProps = {
  stat: BrandVisionStat;
};

function BrandVisionStatCard({ stat }: BrandVisionStatCardProps): ReactElement {
  return (
    <article className="flex min-h-72 flex-col justify-between rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-8 text-right shadow-[0_26px_70px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-colors duration-300 hover:border-secondary/35 hover:bg-white/[0.055] sm:p-10">
      <p className="font-mono text-[0.68rem] tracking-[0.38em] text-white/50">
        {stat.number}
      </p>

      <div>
        <p className="text-2xl sm:text-4xl font-black leading-none text-secondary">
          {stat.value}
        </p>
        <h3 className="mt-8 text-xl font-medium text-white sm:text-2xl">
          {stat.label}
        </h3>
        <p className="mt-3 text-sm font-light leading-7 text-white/52">
          {stat.description}
        </p>
      </div>
    </article>
  );
}

export default BrandVisionStatCard;
