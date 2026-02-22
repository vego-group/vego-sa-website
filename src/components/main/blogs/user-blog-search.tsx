type UserBlogSearchProps = {
  onSearch: (query: string) => void;
  value: string;
  language: "en" | "ar";
};

function UserBlogSearch({ onSearch, value, language }: UserBlogSearchProps) {
  const placeholders = {
    en: "Search articles by title or content...",
    ar: "ابحث في المقالات حسب العنوان أو المحتوى..."
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholders[language]}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pl-12 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
          dir={language === "ar" ? "rtl" : "ltr"}
        />
        <svg
          className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 ${language === "ar" ? "right-4" : "left-4"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}

export { UserBlogSearch };