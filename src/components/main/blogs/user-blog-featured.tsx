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

type UserBlogFeaturedProps = {
  blog: Blog;
  language: "en" | "ar";
};

function UserBlogFeatured({ blog, language }: UserBlogFeaturedProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(language === "en" ? "en-US" : "ar-SA", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative h-64 lg:h-auto order-1 lg:order-2">
          {blog.coverImage ? (
            <Image
              src={blog.coverImage}
              alt={language === "en" ? blog.titleEn : blog.titleAr}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-secondary/5 flex items-center justify-center">
              <span className="text-secondary/40 text-6xl">📷</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center p-8 lg:p-12 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-4 py-1.5 bg-secondary text-white text-sm font-medium rounded-full shadow-md">
              {language === "en" ? "Featured Article" : "مقال مميز"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            <Link href={`/blog/${blog.id}`} className="hover:text-secondary transition-colors">
              {language === "en" ? blog.titleEn : blog.titleAr}
            </Link>
          </h2>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            {language === "en" ? blog.excerptEn : blog.excerptAr}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
            {blog.author && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
          </div>

          <Link
            href={`/blog/${blog.id}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto group"
          >
            {language === "en" ? "Read Full Article" : "اقرأ المقال كاملاً"}
            <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${language === "ar" ? "rotate-180" : ""}`} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export { UserBlogFeatured };