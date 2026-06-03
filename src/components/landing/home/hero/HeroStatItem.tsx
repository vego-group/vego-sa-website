import type { ReactElement } from "react";

import type { HeroStat } from "@/types/landing/home";

type HeroStatItemProps = {
  stat: HeroStat;
};

function HeroStatItem({ stat }: HeroStatItemProps): ReactElement {
  return (
    <li className="border-e border-white/20 pe-4 first:border-e-0 first:pe-0">
      <strong className="block sm:text-2xl font-black text-white">
        {stat.value}
      </strong>
      <span className="mt-1 block text-xs font-semibold text-white/70 sm:text-sm">
        {stat.label}
      </span>
    </li>
  );
}

export default HeroStatItem;
