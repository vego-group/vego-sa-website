"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft } from "lucide-react";

type Blog = {
  id: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  coverImage?: string;
  publishedAt: string | null;
  author?: string;
};

type UserBlogGridProps = {
  blogs: Blog[];
  language: "en" | "ar";
};

function UserBlogGrid({ blogs, language }: UserBlogGridProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(language === "en" ? "en-US" : "ar-SA", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600 text-lg">
          {language === "en" ? "No articles found" : "لم يتم العثور على مقالات"}
        </p>
        <p className="text-slate-400 text-sm mt-2">
          {language === "en" 
            ? "Try adjusting your search" 
            : "حاول تعديل بحثك"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog, index) => (
        <motion.article
          key={blog.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden hover:shadow-2xl hover:shadow-secondary/10 hover:-translate-y-2 transition-all duration-500"
        >
          {/* Cover Image */}
          <Link href={`/blog/${blog.id}`} className="block relative h-56 overflow-hidden">
            {blog.coverImage ? (
              <Image
                src={blog.coverImage}
                alt={language === "en" ? blog.titleEn : blog.titleAr}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                <span className="text-secondary/40 text-lg">📷</span>
              </div>
            )}
          </Link>

          {/* Content */}
          <div className="p-6">
            {/* Author */}
            {blog.author && (
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                <User className="w-3 h-3" />
                <span>{blog.author}</span>
              </div>
            )}

            {/* Title */}
            <Link href={`/blog/${blog.id}`}>
              <h2 className="text-xl font-semibold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                {language === "en" ? blog.titleEn : blog.titleAr}
              </h2>
            </Link>

            {/* Excerpt */}
            <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">
              {language === "en" ? blog.excerptEn : blog.excerptAr}
            </p>

            {/* Date and Read More */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(blog.publishedAt)}
              </span>
              <Link
                href={`/blog/${blog.id}`}
                className="text-secondary hover:text-secondary/80 text-sm font-medium inline-flex items-center gap-1 group/link"
              >
                {language === "en" ? "Read more" : "اقرأ المزيد"}
                <ArrowLeft className={`w-4 h-4 transition-transform group-hover/link:-translate-x-1 ${language === "ar" ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export { UserBlogGrid };