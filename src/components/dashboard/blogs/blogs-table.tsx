"use client";

import { useState, useEffect } from "react";
import { BlogEditorPopup } from "./blog-editor-popup";
import { DeleteConfirmationPopup } from "../dashboard/delete-confirmation-popup";

type BlogsTableProps = {
  activeTab?: "all" | "published" | "drafts";
  searchQuery?: string;
};

type Blog = {
  id: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  metaTitleEn?: string;
  metaTitleAr?: string;
  metaDescriptionEn?: string;
  metaDescriptionAr?: string;
  status: "published" | "draft";
  coverImage?: string;
  publishedAt: string | null;
  languages: string[];
};

function BlogsTable({ activeTab = "all", searchQuery = "" }: BlogsTableProps) {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      titleEn: "Getting Started with ERP: A Comprehensive Guide",
      titleAr: "دليل شامل للبدء مع أنظمة تخطيط موارد المؤسسات",
      excerptEn: "Learn the basics of ERP systems and how they can transform your business operations.",
      excerptAr: "تعلم أساسيات أنظمة تخطيط موارد المؤسسات وكيف يمكنها تحويل عمليات عملك.",
      contentEn: "<p>ERP systems are essential for modern businesses...</p>",
      contentAr: "<p>أنظمة تخطيط موارد المؤسسات ضرورية للأعمال الحديثة...</p>",
      metaTitleEn: "ERP Guide for Beginners | 4S Systems",
      metaTitleAr: "دليل ERP للمبتدئين | 4S Systems",
      metaDescriptionEn: "Complete guide to understanding ERP systems and their benefits.",
      metaDescriptionAr: "دليل كامل لفهم أنظمة تخطيط موارد المؤسسات وفوائدها.",
      status: "published",
      coverImage: "https://example.com/erp-guide.jpg",
      publishedAt: "2025-02-10T10:00:00Z",
      languages: ["EN", "AR"]
    },
    {
      id: "2",
      titleEn: "Cloud ERP vs On-Premise: Which is Right for You?",
      titleAr: "ERP السحابي مقابل المحلي: أيهما مناسب لعملك؟",
      excerptEn: "Compare the pros and cons of cloud-based and on-premise ERP solutions.",
      excerptAr: "قارن بين مزايا وعيوب حلول ERP السحابية والمحلية.",
      contentEn: "<p>Choosing between cloud and on-premise ERP...</p>",
      contentAr: "<p>الاختيار بين ERP السحابي والمحلي...</p>",
      status: "published",
      publishedAt: "2025-02-05T14:30:00Z",
      languages: ["EN", "AR"]
    },
    {
      id: "3",
      titleEn: "ERP Implementation Best Practices",
      titleAr: "أفضل ممارسات تطبيق ERP",
      excerptEn: "Key strategies for successful ERP implementation in your organization.",
      excerptAr: "استراتيجيات رئيسية لنجاح تطبيق ERP في مؤسستك.",
      contentEn: "<p>Successful ERP implementation requires careful planning...</p>",
      contentAr: "<p>تطبيق ERP الناجح يتطلب تخطيطاً دقيقاً...</p>",
      status: "draft",
      publishedAt: null,
      languages: ["EN", "AR"]
    }
  ]);

  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");


  // Filter blogs by status and search query
  const filteredBlogs = blogs.filter(blog => {
    // Filter by status
    if (activeTab === "published" && blog.status !== "published") return false;
    if (activeTab === "drafts" && blog.status !== "draft") return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        blog.titleEn.toLowerCase().includes(query) ||
        blog.titleAr.includes(query) ||
        blog.excerptEn.toLowerCase().includes(query) ||
        blog.excerptAr.includes(query)
      );
    }
    
    return true;
  });

  useEffect(() => {
    // Handle opening new blog editor
    const handleOpenNewBlog = () => {
      setEditingBlog(null);
      setIsEditorOpen(true);
    };

    window.addEventListener('openNewArticle', handleOpenNewBlog);
    return () => window.removeEventListener('openNewArticle', handleOpenNewBlog);
  }, []);

  const handleEdit = (id: string) => {
    const blog = blogs.find(blog => blog.id === id);
    if (blog) {
      setEditingBlog(blog);
      setIsEditorOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    const blog = blogs.find(blog => blog.id === id);
    if (blog) {
      setDeletingBlog(blog);
      setIsDeletePopupOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingBlog) {
      setBlogs(blogs.filter(blog => blog.id !== deletingBlog.id));
    }
    setDeletingBlog(null);
  };

  const handleSubmitBlog = (blogData: any) => {
    if (editingBlog) {
      // Update existing blog
      setBlogs(blogs.map(blog => 
        blog.id === editingBlog.id 
          ? { ...blog, ...blogData }
          : blog
      ));
    } else {
      // Add new blog
      setBlogs([...blogs, blogData]);
    }
    
    setIsEditorOpen(false);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString(language === "en" ? "en-US" : "ar-SA", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === "published") {
      return (
        <span className="inline-flex px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          {language === "en" ? "Published" : "منشور"}
        </span>
      );
    }
    return (
      <span className="inline-flex px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
        {language === "en" ? "Draft" : "مسودة"}
      </span>
    );
  };

  if (filteredBlogs.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 px-4">
        <p className="text-white/40 text-base sm:text-lg">No blogs found</p>
        <p className="text-white/20 text-xs sm:text-sm mt-2">Try changing the filter or create a new blog</p>
      </div>
    );
  }

  return (
    <>
      {/* Language Toggle - Responsive */}
      <div className="flex justify-end p-3 sm:p-4 border-b border-white/10">
        <div className="flex gap-1 sm:gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors
              ${language === "en" 
                ? "bg-secondary text-primary" 
                : "text-white/60 hover:text-white"
              }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("ar")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors
              ${language === "ar" 
                ? "bg-secondary text-primary" 
                : "text-white/60 hover:text-white"
              }`}
          >
            العربية
          </button>
        </div>
      </div>

      {/* Mobile View (Card Layout) */}
      <div className="block lg:hidden divide-y divide-white/10">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="p-4 space-y-3 hover:bg-white/5 transition-colors">
            {/* Title and Status */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-medium text-white line-clamp-2" dir={language === "ar" ? "rtl" : "ltr"}>
                {language === "en" ? blog.titleEn : blog.titleAr}
              </h3>
              {getStatusBadge(blog.status)}
            </div>

            {/* Excerpt */}
            <p className="text-xs text-white/50 line-clamp-2" dir={language === "ar" ? "rtl" : "ltr"}>
              {language === "en" ? blog.excerptEn : blog.excerptAr}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
              <span>{formatDate(blog.publishedAt)}</span>
              <span>•</span>
              <div className="flex gap-1">
                {blog.languages.map((lang) => (
                  <span key={lang} className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-1 pt-2">
              <button
                onClick={() => handleEdit(blog.id)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                title={language === "en" ? "Edit" : "تعديل"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDeleteClick(blog.id)}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-400"
                title={language === "en" ? "Delete" : "حذف"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View (Table Layout) */}
      <div className="hidden lg:block text-white/70 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-xs font-medium text-white/50 uppercase tracking-wider">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Languages</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/10">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-white/5 transition-colors">
                {/* Title */}
                <div className="col-span-5">
                  <h3 className="text-sm font-medium text-white mb-1 line-clamp-1" dir={language === "ar" ? "rtl" : "ltr"}>
                    {language === "en" ? blog.titleEn : blog.titleAr}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-1" dir={language === "ar" ? "rtl" : "ltr"}>
                    {language === "en" ? blog.excerptEn : blog.excerptAr}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  {getStatusBadge(blog.status)}
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <span className="text-sm text-white/60">
                    {formatDate(blog.publishedAt)}
                  </span>
                </div>

                {/* Languages */}
                <div className="col-span-2">
                  <div className="flex gap-1">
                    {blog.languages.map((lang) => (
                      <span 
                        key={lang}
                        className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-start justify-end gap-1">
                  <button
                    onClick={() => handleEdit(blog.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(blog.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-400"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Popup */}
      <BlogEditorPopup
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingBlog(null);
        }}
        onSubmit={handleSubmitBlog}
        blog={editingBlog}
      />

      {/* Delete Confirmation Popup */}
      <DeleteConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={() => {
          setIsDeletePopupOpen(false);
          setDeletingBlog(null);
        }}
        onConfirm={handleDeleteConfirm}
        articleTitle={language === "en" ? deletingBlog?.titleEn : deletingBlog?.titleAr}
      />
    </>
  );
}

export { BlogsTable };