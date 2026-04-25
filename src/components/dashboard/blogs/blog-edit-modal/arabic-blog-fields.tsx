import InputErrorMessage from "@/components/ui/InputErrorMessage";
import type { LanguageSectionProps } from "./types";

function ArabicBlogFields({
  activeLanguage,
  register,
  errors,
}: LanguageSectionProps) {
  return (
    <div
      className={`space-y-4 sm:space-y-6 ${activeLanguage === "ar" ? "block" : "hidden"}`}
      dir="rtl"
    >
      <div>
        <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
          عنوان المقال <span className="text-red-400">*</span>
        </label>
        <input
          {...register?.("title_ar")}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none text-right"
          required
          dir="rtl"
        />
        <InputErrorMessage msg={errors?.title_ar?.message} />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
          الملخص <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register?.("excerpt_ar")}
          rows={3}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none text-right"
          required
          dir="rtl"
        />
        <InputErrorMessage msg={errors?.excerpt_ar?.message} />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
          المحتوى <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register?.("content_ar")}
          rows={6}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none font-mono text-right"
          required
          dir="rtl"
        />
        <InputErrorMessage msg={errors?.content_ar?.message} />
      </div>

      <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
        <h4 className="text-sm sm:text-base font-medium text-white text-right">
          إعدادات SEO (Arabic)
        </h4>
        <div>
          <input
            {...register?.("meta_title_ar")}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none text-right"
            dir="rtl"
          />
          <InputErrorMessage msg={errors?.meta_title_ar?.message} />
        </div>
        <div>
          <textarea
            {...register?.("meta_description_ar")}
            rows={2}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none text-right"
            dir="rtl"
          />
          <InputErrorMessage msg={errors?.meta_description_ar?.message} />
        </div>
      </div>
    </div>
  );
}

export { ArabicBlogFields };
