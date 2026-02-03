import { StatsCard } from "./stats-card";

function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <StatsCard label="Total Posts" value="3" />
      <StatsCard label="Categories" value="3" variant="accent" />
    </div>
  );
}

export { DashboardStats };
