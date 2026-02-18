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

  // Default data structure for bilingual FAQ without category
  const defaultFaq = {
    questionEn: "",
    questionAr: "",
    answerEn: "",
    answerAr: "",
    displayOrder: 1,
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
      order: parseInt(formData.get("displayOrder") as string) || 1,
      questionEn: formData.get("questionEn") as string,
      questionAr: formData.get("questionAr") as string,
      answerEn: formData.get("answerEn") as string,
      answerAr: formData.get("answerAr") as string,
      languages: ["EN", "AR"],
    };
    onSubmit(faqData);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={faq ? "تعديل السؤال الشائع" : "إضافة سؤال شائع جديد"}
      titleClassName="text-2xl font-semibold text-white"
      contentClassName="bg-gradient-to-br from-primary via-primary to-emerald-950 sm:max-w-3xl max-h-[90vh] overflow-y-auto"
      closeButtonClassname="text-white"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Language Tabs */}
        <div className="flex gap-2 border-b border-white/10">
          <button
            type="button"
            onClick={() => setActiveLanguage("en")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative
              ${activeLanguage === "en" 
                ? "text-white" 
                : "text-white/60 hover:text-white/80"
              }`}
          >
            English Version
            {activeLanguage === "en" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveLanguage("ar")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative
              ${activeLanguage === "ar" 
                ? "text-white" 
                : "text-white/60 hover:text-white/80"
              }`}
          >
            Arabic Version (النسخة العربية)
            {activeLanguage === "ar" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
            )}
          </button>
        </div>

        {/* English Version */}
        <div className={`space-y-4 ${activeLanguage === "en" ? "block" : "hidden"}`}>
          <h3 className="text-lg font-medium text-white">English Version</h3>
          
          {/* Question EN */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Question (EN) <span className="text-red-400">*</span>
            </label>
            <input
              name="questionEn"
              defaultValue={currentFaq.questionEn}
              placeholder="Enter question in English..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
              required
              dir="ltr"
            />
          </div>

          {/* Answer EN */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Answer (EN) <span className="text-red-400">*</span>
            </label>
            <textarea
              name="answerEn"
              defaultValue={currentFaq.answerEn}
              placeholder="Enter answer in English..."
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none"
              required
              dir="ltr"
            />
          </div>
        </div>

        {/* Arabic Version */}
        <div className={`space-y-4 ${activeLanguage === "ar" ? "block" : "hidden"}`} dir="rtl">
          <h3 className="text-lg font-medium text-white">Arabic Version (النسخة العربية)</h3>
          
          {/* Question AR */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Question (AR) <span className="text-red-400">*</span>
            </label>
            <input
              name="questionAr"
              defaultValue={currentFaq.questionAr}
              placeholder="أدخل السؤال بالعربية..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none text-right"
              required
              dir="rtl"
            />
          </div>

          {/* Answer AR */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Answer (AR) <span className="text-red-400">*</span>
            </label>
            <textarea
              name="answerAr"
              defaultValue={currentFaq.answerAr}
              placeholder="أدخل الإجابة بالعربية..."
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none text-right"
              required
              dir="rtl"
            />
          </div>
        </div>

        {/* Tip Section */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
          <p className="text-sm text-white/70">
            <span className="font-semibold text-secondary">Tip:</span> Keep questions concise (under 100 characters) and answers informative but not too long (under 500 characters) for better readability.
          </p>
        </div>

        {/* Display Order */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-lg font-medium text-white">Settings</h3>
          
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Display Order
            </label>
            <input
              type="number"
              name="displayOrder"
              defaultValue={currentFaq.displayOrder || currentFaq.order || 1}
              min="1"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
            />
            <p className="text-xs text-white/40 mt-1">Lower numbers appear first</p>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <h3 className="text-lg font-medium text-white">Preview</h3>
          <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-white/60">
                Order #{currentFaq.displayOrder || currentFaq.order || 1}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-secondary text-primary font-semibold hover:bg-secondary/90 transition-colors"
          >
            {faq ? "Update FAQ" : "Create FAQ"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { FaqEditorPopup };