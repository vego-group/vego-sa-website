import type { ActiveLanguage } from "./types";

type LanguageTabsProps = {
  activeLanguage: ActiveLanguage;
  onChange: (lang: ActiveLanguage) => void;
};

function LanguageTabs({ activeLanguage, onChange }: LanguageTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 pb-2 -mt-2 pt-2">
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors relative rounded-lg sm:rounded-none ${
          activeLanguage === "en"
            ? "text-white bg-secondary/20 sm:bg-transparent"
            : "text-white/60 hover:text-white/80"
        }`}
      >
        <span className="sm:hidden">EN</span>
        <span className="hidden sm:inline">English Version</span>
        {activeLanguage === "en" && (
          <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
        )}
      </button>
      <button
        type="button"
        onClick={() => onChange("ar")}
        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors relative rounded-lg sm:rounded-none ${
          activeLanguage === "ar"
            ? "text-white bg-secondary/20 sm:bg-transparent"
            : "text-white/60 hover:text-white/80"
        }`}
      >
        <span className="sm:hidden">AR</span>
        <span className="hidden sm:inline">Arabic Version</span>
        {activeLanguage === "ar" && (
          <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
        )}
      </button>
    </div>
  );
}

export { LanguageTabs };
