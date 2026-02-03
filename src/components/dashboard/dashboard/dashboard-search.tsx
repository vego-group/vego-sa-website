import { Search } from "lucide-react";

function DashboardSearch() {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
        <Search size={18} />
      </span>

      <input
        placeholder="Search by title or category..."
        className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-11 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-secondary/30"
      />
    </div>
  );
}

export { DashboardSearch };
