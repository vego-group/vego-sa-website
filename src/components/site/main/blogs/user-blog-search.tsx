import { useLocale, useTranslations } from "next-intl";

type UserBlogSearchProps = {
  onSearch: (query: string) => void;
  value: string;
};

function UserBlogSearch({ onSearch, value }: UserBlogSearchProps) {
  const locale = useLocale();
  const t = useTranslations("blogs.search");
  const isArabic = locale === "ar";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={t("placeholder")}
          className={`w-full rounded-xl bg-primary px-4 py-3 text-white  focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none ${isArabic ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"}`}
        />
        <svg
          className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 ${isArabic ? "right-4" : "left-4"}`}
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
