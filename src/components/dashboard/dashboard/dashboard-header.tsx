import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  onNewArticle: () => void;
}

function DashboardHeader({ onNewArticle }: DashboardHeaderProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold tracking-[0.28em] text-white/50">
        VEGO SYSTEMS
      </p>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Blog <span className="text-secondary">Dashboard</span>
        </h1>

        <button
          onClick={onNewArticle}
          className="flex items-center gap-2 rounded-2xl bg-secondary px-6 py-3 text-sm font-semibold text-primary hover:bg-secondary/90 transition"
        >
          <Plus size={18} />
          New Article
        </button>
      </div>

      <p className="text-sm text-white/70 sm:text-base">
        Secure content & news management panel
      </p>
    </div>
  );
}

export { DashboardHeader };