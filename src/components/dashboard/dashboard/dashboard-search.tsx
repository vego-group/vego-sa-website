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
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
        <Search size={20} />
      </span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
      />
    </div>
  );
}

export { DashboardSearch };