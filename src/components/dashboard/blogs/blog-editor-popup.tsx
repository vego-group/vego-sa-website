"use client";

import Modal from "@/components/ui/modal";
import { useEffect, useState, useRef } from "react";

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
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setImagePreview(currentBlog.coverImage);
    }
  }, [currentBlog.coverImage]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImagePreview("");
    setSelectedImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // In a real application, you would upload the image to your server here
    // and get back a URL. For now, we'll use the preview URL or existing image
    const coverImage = imagePreview || selectedImage;
    
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
      coverImage: coverImage,
      publishedAt: formData.get("status") === "published" ? new Date().toISOString() : null,
      languages: ["EN", "AR"],
    };
    
    onSubmit(blogData);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={blog ? "Edit Blog Post" : "Create New Blog"}
      titleClassName="text-2xl font-semibold text-white"
      contentClassName="bg-gradient-to-br from-primary via-primary to-emerald-950 sm:max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
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

          {/* English SEO Settings */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-base font-medium text-white">SEO Settings (English)</h4>
            
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

          {/* Arabic SEO Settings */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-base font-medium text-white text-right">إعدادات تحسين محركات البحث (SEO)</h4>
            
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

        {/* Cover Image - Updated to file upload */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-lg font-medium text-white">Cover Image</h3>
          
          <div className="space-y-4">
            {/* File Upload Area */}
            <div className="flex flex-col items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mb-1 text-sm text-white/60">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-white/40">PNG, JPG, JPEG, GIF (Max 5MB)</p>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg, image/gif"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Image Preview */}
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-white/10 max-w-md group">
                <img 
                  src={imagePreview} 
                  alt="Cover preview" 
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove image"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="p-8 bg-white/5 rounded-xl border border-white/10 max-w-md flex items-center justify-center">
                <p className="text-white/40 text-sm">No image selected</p>
              </div>
            )}

            {/* Hidden input to store image data for form submission */}
            <input
              type="hidden"
              name="coverImage"
              value={imagePreview || selectedImage}
            />
          </div>
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