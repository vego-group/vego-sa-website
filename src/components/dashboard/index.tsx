"use client";
import { useState } from "react";
import Modal from "../ui/modal";

function DashboardDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsMobileMenuOpen(true)}>click here </button>
      <Modal
        title="edit blog"
        titleClassName="text-secondary"
        contentClassName="sm:max-w-3xl"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        <form
          onSubmit={() => setIsMobileMenuOpen(false)}
          className="space-y-6 bg-primary"
        >
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Title
              </label>
              <input
                name="title"
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
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
            />
            {/* {currentArticle.imageUrl && (
              <div className="mt-3">
                <p className="text-xs text-white/60 mb-2">Image Preview:</p>
                <div className="w-32 h-32 rounded-lg overflow-hidden border border-white/10">
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
            )} */}
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
              placeholder="Enter full article content"
              rows={8}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
            <button
              type="button"
              className="px-6 py-3 rounded-2xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-secondary text-primary font-semibold hover:bg-secondary/90 transition-colors"
            >
              {"Publish Article"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default DashboardDemo;
