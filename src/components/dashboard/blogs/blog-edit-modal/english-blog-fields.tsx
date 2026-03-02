import InputErrorMessage from "@/components/ui/InputErrorMessage";
import type { LanguageSectionProps } from "./types";

function EnglishBlogFields({
  blog,
  activeLanguage,
  register,
  errors,
}: LanguageSectionProps) {
  return (
    <div
      className={`space-y-4 sm:space-y-6 ${activeLanguage === "en" ? "block" : "hidden"}`}
    >
      <div>
        <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
          Blog Title <span className="text-red-400">*</span>
        </label>
        <input
          {...register?.("title_en")}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
          required
          dir="ltr"
        />
        <InputErrorMessage msg={errors?.title_en?.message} />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
          Excerpt <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register?.("excerpt_en")}
          rows={3}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none"
          required
          dir="ltr"
        />
        <InputErrorMessage msg={errors?.excerpt_en?.message} />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
          Content <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register?.("content_en")}
          rows={6}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none font-mono"
          required
          dir="ltr"
        />
        <InputErrorMessage msg={errors?.content_en?.message} />
      </div>

      <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
        <h4 className="text-sm sm:text-base font-medium text-white">
          SEO Settings (English)
        </h4>
        <div>
          <input
            {...register?.("meta_title_en")}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
            dir="ltr"
          />
          <InputErrorMessage msg={errors?.meta_title_en?.message} />
        </div>
        <div>
          <textarea
            {...register?.("meta_description_en")}
            rows={2}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none"
            dir="ltr"
          />
          <InputErrorMessage msg={errors?.meta_description_en?.message} />
        </div>
      </div>
    </div>
  );
}

export { EnglishBlogFields };
