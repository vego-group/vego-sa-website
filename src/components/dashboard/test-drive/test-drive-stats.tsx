"use client";

import { ComponentProps } from "react";

import { SkeletonCard } from "@/components/skeleton/card";
import { useDashboardTestDriveRegistrations } from "@/hooks/api";

import { StatsCard } from "../dashboard/stats-card";

type TestDriveRegistration = {
  gender?: string | null;
  product?: string | null;
};

type TestDriveStatistics = {
  total_registrations?: number | string;
  males?: number | string;
  females?: number | string;
  products?: Record<string, number | string> | null;
};

function getRows(payload: unknown): TestDriveRegistration[] {
  const response = payload as
    | {
        data?:
          | TestDriveRegistration[]
          | { data?: TestDriveRegistration[]; meta?: Record<string, unknown> };
        meta?: Record<string, unknown>;
        statistics?: TestDriveStatistics;
      }
    | undefined;

  const dataNode = response?.data;

  if (Array.isArray(dataNode)) return dataNode;
  if (dataNode && !Array.isArray(dataNode) && Array.isArray(dataNode.data)) {
    return dataNode.data;
  }

  return [];
}

function getMeta(payload: unknown) {
  const response = payload as
    | {
        data?:
          | TestDriveRegistration[]
          | { data?: TestDriveRegistration[]; meta?: Record<string, unknown> };
        meta?: Record<string, unknown>;
        statistics?: TestDriveStatistics;
      }
    | undefined;

  const dataNode = response?.data;

  if (dataNode && !Array.isArray(dataNode) && dataNode.meta) {
    return dataNode.meta;
  }

  return response?.meta;
}

function getStatistics(payload: unknown) {
  const response = payload as
    | {
        statistics?: TestDriveStatistics;
      }
    | undefined;

  return response?.statistics;
}

function TestDriveStats() {
  type StatsCardVariant = ComponentProps<typeof StatsCard>["variant"];

  const { data, isLoading, isFetching } = useDashboardTestDriveRegistrations(1);
  const rows = getRows(data);
  const meta = getMeta(data) as { total?: number | string } | undefined;
  const statistics = getStatistics(data);

  const maleCount = rows.filter((item) => item.gender === "Male").length;
  const femaleCount = rows.filter((item) => item.gender === "Female").length;

  const productStats =
    statistics?.products && Object.keys(statistics.products).length > 0
      ? Object.entries(statistics.products)
      : Object.entries(
          rows.reduce<Record<string, number>>((acc, item) => {
            const product = item.product?.trim();

            if (!product) return acc;

            acc[product] = (acc[product] ?? 0) + 1;
            return acc;
          }, {}),
        );

  const stats: Array<{
    label: string;
    value: string;
    variant?: StatsCardVariant;
  }> = [
    {
      label: "Total Registrations",
      value: String(statistics?.total_registrations ?? meta?.total ?? rows.length),
      variant: "accent",
    },
    {
      label: "Male",
      value: String(statistics?.males ?? maleCount),
    },
    {
      label: "Female",
      value: String(statistics?.females ?? femaleCount),
    },
  ];

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
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
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:col-span-2 lg:col-span-3">
        <p className="text-xs uppercase tracking-[0.22em] text-white/50">
          Products
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {productStats.map(([product, count]) => (
            <div
              key={product}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                {product}
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { TestDriveStats };
