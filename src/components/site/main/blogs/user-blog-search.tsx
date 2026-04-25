import { Search } from "lucide-react";
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
    <div className="mx-auto max-w-3xl">
      <div className="relative">
        <div
          className={`pointer-events-none absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl bg-primary/5 text-primary ${isArabic ? "right-3" : "left-3"}`}
        >
          <Search className="h-5 w-5" strokeWidth={2.2} />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={t("placeholder")}
          className={`w-full rounded-[1.35rem] bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none ring-1 ring-slate-200 transition placeholder:text-xs placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/20 sm:placeholder:text-sm ${isArabic ? "pr-16 pl-4 text-right" : "pl-16 pr-4 text-left"}`}
        />
      </div>
    </div>
  );
}

export { UserBlogSearch };
