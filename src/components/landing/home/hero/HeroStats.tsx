import type { ReactElement } from "react";

import type { HeroStat } from "@/types/landing/home";
import HeroStatItem from "./HeroStatItem";

type HeroStatsProps = {
  stats: HeroStat[];
};

function HeroStats({ stats }: HeroStatsProps): ReactElement {
  return (
    <ul className="flex flex-wrap items-center gap-x-7 gap-y-4">
      {stats.map((stat) => (
        <HeroStatItem key={stat.label} stat={stat} />
      ))}
    </ul>
  );
}

export default HeroStats;
