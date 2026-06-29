import { ComponentProps } from "react";

import { SkeletonCard } from "@/components/skeleton/card";
import { useInvestmentInterests } from "@/hooks/api/investment-interests";
import { StatsCard } from "../dashboard/stats-card";

function InvestmentInterestsStats() {
  type StatsCardVariant = ComponentProps<typeof StatsCard>["variant"];
  const { data, isLoading, isFetching } = useInvestmentInterests(1);
  const ticketTypes = data?.statistics?.ticket_types ?? {};
  const stats: Array<{ label: string; value: string; variant?: StatsCardVariant }> = [
    { label: "Total Requests", value: String(data?.statistics?.total ?? 0) },
    {
      label: "150k - 200k",
      value: String(ticketTypes["150000-200000"] ?? 0),
      variant: "accent",
    },
    { label: "250k - 350k", value: String(ticketTypes["250000-350000"] ?? 0) },
    { label: "350k+", value: String(ticketTypes["350000+"] ?? 0) },
  ];

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} className="h-29.5 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
      {stats.map((stat) => (
        <StatsCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          variant={stat.variant}
        />
      ))}
    </div>
  );
}

export { InvestmentInterestsStats };
