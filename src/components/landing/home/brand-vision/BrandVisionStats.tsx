import type { ReactElement } from "react";

import type { BrandVisionContent } from "@/types/landing/home";
import BrandVisionStatCard from "./BrandVisionStatCard";

type BrandVisionStatsProps = {
  stats: BrandVisionContent["stats"];
};

function BrandVisionStats({ stats }: BrandVisionStatsProps): ReactElement {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <BrandVisionStatCard key={stat.number} stat={stat} />
      ))}
    </div>
  );
}

export default BrandVisionStats;
