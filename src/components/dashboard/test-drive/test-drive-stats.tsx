"use client";

import { ComponentProps } from "react";

import { SkeletonCard } from "@/components/skeleton/card";
import { useDashboardTestDriveRegistrations } from "@/hooks/api";

import { StatsCard } from "../dashboard/stats-card";

type TestDriveRegistration = {
  gender?: string | null;
  product?: string | null;
};

function getRows(payload: unknown): TestDriveRegistration[] {
  const response = payload as
    | {
        data?:
          | TestDriveRegistration[]
          | { data?: TestDriveRegistration[]; meta?: Record<string, unknown> };
        meta?: Record<string, unknown>;
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
      }
    | undefined;

  const dataNode = response?.data;

  if (dataNode && !Array.isArray(dataNode) && dataNode.meta) {
    return dataNode.meta;
  }

  return response?.meta;
}

function TestDriveStats() {
  type StatsCardVariant = ComponentProps<typeof StatsCard>["variant"];

  const { data, isLoading, isFetching } = useDashboardTestDriveRegistrations(1);
  const rows = getRows(data);
  const meta = getMeta(data) as { total?: number | string } | undefined;

  const maleCount = rows.filter((item) => item.gender === "Male").length;
  const femaleCount = rows.filter((item) => item.gender === "Female").length;
  const uniqueProducts = new Set(
    rows.map((item) => item.product).filter(Boolean),
  ).size;

  const stats: Array<{
    label: string;
    value: string;
    variant?: StatsCardVariant;
  }> = [
    {
      label: "Total Registrations",
      value: String(meta?.total ?? rows.length),
    },
    { label: "Male", value: String(maleCount), variant: "accent" },
    { label: "Female", value: String(femaleCount) },
    { label: "Products", value: String(uniqueProducts) },
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
    </div>
  );
}

export { TestDriveStats };
