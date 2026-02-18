"use client";

import Modal from "@/components/ui/modal";
import { useEffect } from "react";

type ArticleEditorPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (articleData: any) => void;
  article?: any;
};

function ArticleEditorPopup({
  isOpen,
  onClose,
  onSubmit,
  article,
}: ArticleEditorPopupProps) {
  const defaultArticle = {
    title: "",
    category: "",
    news: "",
    imageUrl: "",
    shortExcerpt: "",
    fullContent: "",
  };

  const currentArticle = article || defaultArticle;

  useEffect(() => {
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
    const articleData = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      news: formData.get("news") as string,
      imageUrl: formData.get("imageUrl") as string,
      shortExcerpt: formData.get("shortExcerpt") as string,
      fullContent: formData.get("fullContent") as string,
    };
    onSubmit(articleData);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={article ? "Edit Article" : "New Article"}
      titleClassName="text-xl sm:text-2xl font-semibold text-white"
      contentClassName="bg-gradient-to-br from-primary via-primary to-emerald-950 w-[95vw] sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto"
      closeButtonClassname="text-white"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Title & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
              Title
            </label>
            <input
              name="title"
              defaultValue={currentArticle.title}
              placeholder="Enter article title"
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
              Category
            </label>
            <input
              name="category"
              defaultValue={currentArticle.category}
              placeholder="Enter category"
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* News Type */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
            News Type
          </label>
          <input
            name="news"
            defaultValue={currentArticle.news}
            placeholder="Enter news type"
            className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
            Image URL
          </label>
          <input
            name="imageUrl"
            defaultValue={currentArticle.imageUrl}
            placeholder="https://images.unsplash.com/..."
            className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
          />
          {currentArticle.imageUrl && (
            <div className="mt-2 sm:mt-3">
              <p className="text-xs text-white/60 mb-2">Image Preview:</p>
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-lg overflow-hidden border border-white/10">
                <img
                  src={currentArticle.imageUrl}
                  alt="Article preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-white/10 my-2 sm:my-4"></div>

        {/* Short Excerpt */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
            Short Excerpt
          </label>
          <textarea
            name="shortExcerpt"
            defaultValue={currentArticle.shortExcerpt}
            placeholder="Enter a brief excerpt"
            rows={2}
            className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none"
          />
        </div>

        {/* Separator */}
        <div className="border-t border-white/10 my-2 sm:my-4"></div>

        {/* Full Content */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
            Full Content
          </label>
          <textarea
            name="fullContent"
            defaultValue={currentArticle.fullContent}
            placeholder="Enter full article content"
            rows={6}
            className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
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
            {article ? "Update Article" : "Publish Article"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { ArticleEditorPopup };