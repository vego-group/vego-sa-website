import { StatsCard } from "../dashboard/stats-card";

function FaqsStats() {
  const stats = [
    { label: "Total FAQs", value: "3" },
    { label: "Categories", value: "3", variant: "accent" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          label={stat.label}
          value={stat.value}
          variant={stat.variant as any}
        />
      ))}
    </div>
  );
}

export { FaqsStats };