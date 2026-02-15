"use client";

import Modal from "@/components/ui/modal";
import { useEffect } from "react";

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
  // Default data
  const defaultFaq = {
    question: "",
    category: "General",
    answer: "",
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
      question: formData.get("question") as string,
      category: formData.get("category") as string,
      answer: formData.get("answer") as string,
    };
    onSubmit(faqData);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={faq ? "Edit FAQ" : "New FAQ"}
      titleClassName="text-2xl font-semibold text-white"
      contentClassName="bg-gradient-to-br from-primary via-primary to-emerald-950 sm:max-w-2xl"
      closeButtonClassname="text-white"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Question
          </label>
          <input
            name="question"
            defaultValue={currentFaq.question}
            placeholder="Enter the frequently asked question"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Category
          </label>
          <select
            name="category"
            defaultValue={currentFaq.category}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
            required
          >
            <option value="General" className="bg-primary">General</option>
            <option value="Implementation" className="bg-primary">Implementation</option>
            <option value="Security" className="bg-primary">Security</option>
            <option value="Pricing" className="bg-primary">Pricing</option>
            <option value="Support" className="bg-primary">Support</option>
          </select>
        </div>

        {/* Answer */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Answer
          </label>
          <textarea
            name="answer"
            defaultValue={currentFaq.answer}
            placeholder="Enter the detailed answer"
            rows={6}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none"
            required
          />
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
            {faq ? "Update FAQ" : "Publish FAQ"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { FaqEditorPopup };