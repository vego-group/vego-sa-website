"use client";

import Modal from "@/components/ui/modal";
import { useEffect, useState } from "react";

type FaqEditorPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (faqData: any) => void;
  faq?: any;
};

function FaqEditorPopup({
  isOpen,
  onClose,
  onSubmit,
  faq,
}: FaqEditorPopupProps) {
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ar">("en");

  // Default data structure for bilingual FAQ
  const defaultFaq = {
    questionEn: "",
    questionAr: "",
    answerEn: "",
    answerAr: "",
    order: 1,
    status: "draft",
    publishedAt: null,
  };

  const currentFaq = faq || defaultFaq;

  useEffect(() => {
    // Prevent scrolling when popup is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const faqData = {
      id: faq?.id || Date.now().toString(),
      order: parseInt(formData.get("order") as string) || 1,
      questionEn: formData.get("questionEn") as string,
      questionAr: formData.get("questionAr") as string,
      answerEn: formData.get("answerEn") as string,
      answerAr: formData.get("answerAr") as string,
      status: formData.get("status") as string,
      publishedAt:
        formData.get("status") === "published"
          ? new Date().toISOString()
          : null,
      languages: ["EN", "AR"],
    };

    onSubmit(faqData);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={faq ? "Edit FAQ" : "Create New FAQ"}
      titleClassName="text-xl sm:text-2xl font-semibold text-white"
      contentClassName="bg-linear-to-br from-emerald-950 via-primary to-emerald-950 sm:max-w-2xl lg:max-w-3xl"
      closeButtonClassname="text-white"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6 p-4 sm:p-6"
      >
        {/* Language Tabs - Responsive */}
        <div className="flex flex-col sm:flex-row gap-2 pb-2">
          <button
            type="button"
            onClick={() => setActiveLanguage("en")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative rounded-lg sm:rounded-none
              ${
                activeLanguage === "en"
                  ? "text-white bg-secondary/20 sm:bg-transparent"
                  : "text-white/60 hover:text-white/80"
              }`}
          >
            English Version
            {activeLanguage === "en" && (
              <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveLanguage("ar")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative rounded-lg sm:rounded-none
              ${
                activeLanguage === "ar"
                  ? "text-white bg-secondary/20 sm:bg-transparent"
                  : "text-white/60 hover:text-white/80"
              }`}
          >
            Arabic Version (النسخة العربية)
            {activeLanguage === "ar" && (
              <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
            )}
          </button>
        </div>

        {/* English Version */}
        <div
          className={`space-y-4 sm:space-y-6 ${activeLanguage === "en" ? "block" : "hidden"}`}
        >
          {/* Question EN */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
              Question <span className="text-red-400">*</span>
            </label>
            <input
              name="questionEn"
              defaultValue={currentFaq.questionEn}
              placeholder="Enter question in English..."
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
              required
              dir="ltr"
            />
          </div>

          {/* Answer EN */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
              Answer <span className="text-red-400">*</span>
            </label>
            <textarea
              name="answerEn"
              defaultValue={currentFaq.answerEn}
              placeholder="Enter answer in English..."
              rows={4}
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none"
              required
              dir="ltr"
            />
          </div>
        </div>

        {/* Arabic Version */}
        <div
          className={`space-y-4 sm:space-y-6 ${activeLanguage === "ar" ? "block" : "hidden"}`}
          dir="rtl"
        >
          {/* Question AR */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2 text-right">
              السؤال <span className="text-red-400">*</span>
            </label>
            <input
              name="questionAr"
              defaultValue={currentFaq.questionAr}
              placeholder="أدخل السؤال بالعربية..."
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none text-right"
              required
              dir="rtl"
            />
          </div>

          {/* Answer AR */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2 text-right">
              الإجابة <span className="text-red-400">*</span>
            </label>
            <textarea
              name="answerAr"
              defaultValue={currentFaq.answerAr}
              placeholder="أدخل الإجابة بالعربية..."
              rows={4}
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none text-right"
              required
              dir="rtl"
            />
          </div>
        </div>

        {/* Separator */}
        <div className="my-2 sm:my-4"></div>

        {/* Settings */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-lg font-medium text-white pb-2">Settings</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Display Order */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
                Display Order
              </label>
              <input
                type="number"
                name="order"
                defaultValue={currentFaq.order || 1}
                min="1"
                className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
              />
              <p className="text-xs text-white/40 mt-1">
                Lower numbers appear first
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
                Status
              </label>
              <select
                name="status"
                defaultValue={currentFaq.status || "draft"}
                className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
              >
                <option value="draft" className="bg-primary">
                  Save as Draft
                </option>
                <option value="published" className="bg-primary">
                  Publish
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Tip Section */}
        <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-white/70">
            <span className="font-semibold text-secondary">Tip:</span> Keep
            questions concise (under 100 characters) and answers informative but
            not too long (under 500 characters) for better readability.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-secondary text-primary font-semibold hover:bg-secondary/90 transition-colors text-sm sm:text-base"
          >
            {faq ? "Update FAQ" : "Create FAQ"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { FaqEditorPopup };
