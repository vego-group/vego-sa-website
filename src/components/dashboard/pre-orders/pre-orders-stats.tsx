import type { ComponentProps } from "react";
import { SaudiRiyal } from "lucide-react";
import { StatsCard } from "../dashboard/stats-card";
import { usePreOrders } from "@/hooks/api/pre-orders";
import { SkeletonCard } from "@/components/skeleton/card";
import type { PreOrdersApiListResponse } from "@/types/dashboard/pre-orders";

function PreOrdersStats() {
  type StatsCardVariant = ComponentProps<typeof StatsCard>["variant"];

  const { data, isLoading, isFetching } = usePreOrders(1);
  const analytics =
    (data as PreOrdersApiListResponse | undefined)?.analytics ??
    (data as PreOrdersApiListResponse | undefined)?.statistics;
  const depositValue = analytics?.total_deposit_amount
    ? analytics.total_deposit_amount
    : "0";

  const stats: Array<{
    label: string;
    value: React.ReactNode;
    variant?: StatsCardVariant;
  }> = [
    {
      label: "Total Pre Orders",
      value: String(analytics?.total_preorders ?? 0),
    },
    {
      label: "Pending",
      value: String(analytics?.pending_preorders ?? 0),
      variant: "accent",
    },
    {
      label: "Approved",
      value: String(analytics?.approved_preorders ?? 0),
    },
    {
      label: "Cancelled",
      value: String(analytics?.cancelled_preorders ?? 0),
    },
    {
      label: "Total Deposits",
      value: (
        <span className="flex items-center gap-1">
          <SaudiRiyal className="size-6 shrink-0" />
          {depositValue}
        </span>
      ),
    },
  ];

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} className="h-29.5 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
      {stats.map((stat, i) => (
        <StatsCard
          key={i}
          label={stat.label}
          value={stat.value}
          variant={stat.variant}
        />
      ))}
    </div>
  );
}

export { PreOrdersStats };
