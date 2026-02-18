import { Search } from "lucide-react";

type DashboardSearchProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
  value?: string;
};

function DashboardSearch({ 
  placeholder = "Search blogs by title, category, or content...",
  onSearch,
  value
}: DashboardSearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/50">
        <Search size={16} className="sm:w-5 sm:h-5" />
      </span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-10 sm:h-12 w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 pl-9 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
      />
    </div>
  );
}

export { DashboardSearch };