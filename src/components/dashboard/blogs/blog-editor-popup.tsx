"use client";

import Modal from "@/components/ui/modal";
import { useEffect, useState } from "react";

type BlogEditorPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (blogData: any) => void;
  blog?: any;
};

function BlogEditorPopup({
  isOpen,
  onClose,
  onSubmit,
  blog,
}: BlogEditorPopupProps) {
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ar">("en");
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Default data structure for bilingual blog (without author)
  const defaultBlog = {
    titleEn: "",
    titleAr: "",
    excerptEn: "",
    excerptAr: "",
    contentEn: "",
    contentAr: "",
    metaTitleEn: "",
    metaTitleAr: "",
    metaDescriptionEn: "",
    metaDescriptionAr: "",
    status: "draft",
    coverImage: "",
    publishedAt: null,
  };

  const currentBlog = blog || defaultBlog;

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

  useEffect(() => {
    if (currentBlog.coverImage) {
      setSelectedImage(currentBlog.coverImage);
    }
  }, [currentBlog.coverImage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const blogData = {
      id: blog?.id || Date.now().toString(),
      titleEn: formData.get("titleEn") as string,
      titleAr: formData.get("titleAr") as string,
      excerptEn: formData.get("excerptEn") as string,
      excerptAr: formData.get("excerptAr") as string,
      contentEn: formData.get("contentEn") as string,
      contentAr: formData.get("contentAr") as string,
      metaTitleEn: formData.get("metaTitleEn") as string,
      metaTitleAr: formData.get("metaTitleAr") as string,
      metaDescriptionEn: formData.get("metaDescriptionEn") as string,
      metaDescriptionAr: formData.get("metaDescriptionAr") as string,
      status: formData.get("status") as string,
      coverImage: formData.get("coverImage") as string,
      publishedAt: formData.get("status") === "published" ? new Date().toISOString() : null,
      languages: ["EN", "AR"],
    };
    
    onSubmit(blogData);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={blog ? "Edit Blog Post" : "Create New Blog"} // Changed to English
      titleClassName="text-2xl font-semibold text-white"
      contentClassName="bg-gradient-to-br from-primary via-primary to-emerald-950 sm:max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4"
      closeButtonClassname="text-white"
    >
      <form onSubmit={handleSubmit} className="space-y-6 p-1">
        {/* Language Tabs - Responsive */}
        <div className="flex flex-col sm:flex-row gap-2 border-b border-white/10 pb-2">
          <button
            type="button"
            onClick={() => setActiveLanguage("en")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative rounded-lg sm:rounded-none
              ${activeLanguage === "en" 
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
              ${activeLanguage === "ar" 
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
        <div className={`space-y-6 ${activeLanguage === "en" ? "block" : "hidden"}`}>
          <h3 className="text-lg font-medium text-white border-b border-white/10 pb-2">English Version</h3>
          
          {/* Blog Title */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Blog Title <span className="text-red-400">*</span>
            </label>
            <input
              name="titleEn"
              defaultValue={currentBlog.titleEn}
              placeholder="Enter blog title in English..."
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none text-sm sm:text-base"
              required
              dir="ltr"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Excerpt <span className="text-red-400">*</span>
            </label>
            <textarea
              name="excerptEn"
              defaultValue={currentBlog.excerptEn}
              placeholder="Brief description of your blog post..."
              rows={3}
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none text-sm sm:text-base"
              required
              dir="ltr"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              name="contentEn"
              defaultValue={currentBlog.contentEn}
              placeholder="Write your blog content here... (supports HTML)"
              rows={8}
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none font-mono text-sm"
              required
              dir="ltr"
            />
            <p className="text-xs text-white/40 mt-1">You can use HTML tags for formatting</p>
          </div>
        </div>

        {/* Arabic Version */}
        <div className={`space-y-6 ${activeLanguage === "ar" ? "block" : "hidden"}`} dir="rtl">
          <h3 className="text-lg font-medium text-white border-b border-white/10 pb-2">Arabic Version (النسخة العربية)</h3>
          
          {/* Blog Title AR */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              عنوان المقال <span className="text-red-400">*</span>
            </label>
            <input
              name="titleAr"
              defaultValue={currentBlog.titleAr}
              placeholder="أدخل عنوان المقال بالعربية..."
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none text-sm sm:text-base text-right"
              required
              dir="rtl"
            />
          </div>

          {/* Excerpt AR */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              الملخص <span className="text-red-400">*</span>
            </label>
            <textarea
              name="excerptAr"
              defaultValue={currentBlog.excerptAr}
              placeholder="وصف مختصر للمقال..."
              rows={3}
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none text-sm sm:text-base text-right"
              required
              dir="rtl"
            />
          </div>

          {/* Content AR */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              المحتوى <span className="text-red-400">*</span>
            </label>
            <textarea
              name="contentAr"
              defaultValue={currentBlog.contentAr}
              placeholder="اكتب محتوى المقال هنا... (يدعم HTML)"
              rows={8}
              className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none font-mono text-sm text-right"
              required
              dir="rtl"
            />
            <p className="text-xs text-white/40 mt-1 text-right">يمكنك استخدام وسوم HTML للتنسيق</p>
          </div>
        </div>

        {/* SEO Settings - Responsive Grid */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <h3 className="text-lg font-medium text-white">SEO Settings</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* English SEO */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white/60">English</h4>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Meta Title
                </label>
                <input
                  name="metaTitleEn"
                  defaultValue={currentBlog.metaTitleEn}
                  placeholder="SEO title for search engines"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none text-sm"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="metaDescriptionEn"
                  defaultValue={currentBlog.metaDescriptionEn}
                  placeholder="SEO description for search engines"
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Arabic SEO */}
            <div className="space-y-4" dir="rtl">
              <h4 className="text-sm font-medium text-white/60 text-right">العربية</h4>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2 text-right">
                  العنوان لتحسين محركات البحث
                </label>
                <input
                  name="metaTitleAr"
                  defaultValue={currentBlog.metaTitleAr}
                  placeholder="عنوان SEO لمحركات البحث"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none text-sm text-right"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2 text-right">
                  الوصف لتحسين محركات البحث
                </label>
                <textarea
                  name="metaDescriptionAr"
                  defaultValue={currentBlog.metaDescriptionAr}
                  placeholder="وصف SEO لمحركات البحث"
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none resize-none text-sm text-right"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Publish Settings */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-lg font-medium text-white">Publish Settings</h3>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Status
            </label>
            <select
              name="status"
              defaultValue={currentBlog.status || "draft"}
              className="w-full max-w-xs rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 text-white focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none text-sm"
            >
              <option value="draft" className="bg-primary">Save as Draft</option>
              <option value="published" className="bg-primary">Publish</option>
            </select>
          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-lg font-medium text-white">Cover Image</h3>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Image URL
            </label>
            <input
              name="coverImage"
              type="url"
              defaultValue={currentBlog.coverImage}
              onChange={(e) => setSelectedImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none text-sm"
            />
          </div>

          {selectedImage ? (
            <div className="mt-4 rounded-xl overflow-hidden border border-white/10 max-w-md">
              <img 
                src={selectedImage} 
                alt="Cover preview" 
                className="w-full h-32 sm:h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="mt-4 p-8 bg-white/5 rounded-xl border border-white/10 max-w-md flex items-center justify-center">
              <p className="text-white/40 text-sm">No image selected</p>
            </div>
          )}
        </div>

        {/* Action Buttons - Responsive */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm sm:text-base order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-secondary text-primary font-semibold hover:bg-secondary/90 transition-colors text-sm sm:text-base order-1 sm:order-2"
          >
            {blog ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { BlogEditorPopup };