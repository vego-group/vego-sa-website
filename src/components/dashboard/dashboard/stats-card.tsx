type StatsCardProps = {
  label: string;
  value: string;
  variant?: "default" | "accent";
};

function StatsCard({ label, value, variant = "default" }: StatsCardProps) {
  const accent =
    variant === "accent"
      ? "border-secondary/40 bg-secondary/10"
      : "border-white/10 bg-white/5";

  return (
    <div
      className={`rounded-2xl border p-6 backdrop-blur-xl ${accent}`}
    >
      <p className="text-xs uppercase tracking-[0.22em] text-white/50">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

export { StatsCard };
