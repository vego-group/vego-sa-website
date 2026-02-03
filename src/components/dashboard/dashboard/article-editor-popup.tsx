"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type ArticleEditorPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (articleData: any) => void;
  article?: any;
};

function ArticleEditorPopup({ isOpen, onClose, onSubmit, article }: ArticleEditorPopupProps) {
  // إعداد البيانات الافتراضية
  const defaultArticle = {
    title: "",
    category: "",
    news: "",
    imageUrl: "",
    shortExcerpt: "",
    fullContent: ""
  };

  const currentArticle = article || defaultArticle;

  useEffect(() => {
    // منع التمرير عند فتح الـ popup
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />

          {/* Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-white/20 bg-gradient-to-br from-primary via-primary to-emerald-950 p-8 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 z-10 text-white/70 hover:text-white transition-colors bg-black/30 rounded-full p-1"
              >
                <X size={24} />
              </button>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {article ? "Edit Article" : "New Article"}
                  </h2>
                  <p className="text-sm text-white/70 mt-1">
                    {article ? "Update the article details below" : "Fill in the article details below"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Title
                      </label>
                      <input
                        name="title"
                        defaultValue={currentArticle.title}
                        placeholder="Enter article title"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Category
                      </label>
                      <input
                        name="category"
                        defaultValue={currentArticle.category}
                        placeholder="Enter category"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* News Type */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      News Type
                    </label>
                    <input
                      name="news"
                      defaultValue={currentArticle.news}
                      placeholder="Enter news type"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Image URL
                    </label>
                    <input
                      name="imageUrl"
                      defaultValue={currentArticle.imageUrl}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
                    />
                    {currentArticle.imageUrl && (
                      <div className="mt-3">
                        <p className="text-xs text-white/60 mb-2">Image Preview:</p>
                        <div className="w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                          <img 
                            src={currentArticle.imageUrl} 
                            alt="Article preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Separator */}
                  <div className="border-t border-white/10 my-2"></div>

                  {/* Short Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Short Excerpt
                    </label>
                    <textarea
                      name="shortExcerpt"
                      defaultValue={currentArticle.shortExcerpt}
                      placeholder="Enter a brief excerpt"
                      rows={3}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Separator */}
                  <div className="border-t border-white/10 my-2"></div>

                  {/* Full Content */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Full Content
                    </label>
                    <textarea
                      name="fullContent"
                      defaultValue={currentArticle.fullContent}
                      placeholder="Enter full article content"
                      rows={8}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none"
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
                      {article ? "Update Article" : "Publish Article"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export { ArticleEditorPopup };