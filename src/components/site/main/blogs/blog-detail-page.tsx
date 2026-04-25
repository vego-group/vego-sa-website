"use client";

import { useEffect } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useBlog } from "@/hooks/api";
import { Link } from "@/i18n/navigation";
import { BlogGuest, RecommendedBlog } from "@/interfaces/site/main/blogs";
import { BlogDetailEmpty } from "./blog-detail-empty";
import { BlogDetailHero } from "./blog-detail-hero";
import { BlogDetailLoading } from "./blog-detail-loading";
import { BlogDetailRelated } from "./blog-detail-related";
import { BlogDetailSummary } from "./blog-detail-summary";

interface BlogProps {
  id: string;
}

function BlogDetailPage({ id }: BlogProps) {
  const t = useTranslations("blogs-detail");
  const locale = useLocale();
  const BackArrow = locale === "ar" ? ArrowRight : ArrowLeft;

  const { data, isLoading } = useBlog(Number(id));
  const blog: BlogGuest | undefined = data?.data;
  const recommendedBlogs: RecommendedBlog[] | undefined =
    blog?.recommended_blogs;

  useEffect(() => {
    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
    }
  }, [blog?.content]);

  if (isLoading) return <BlogDetailLoading />;
  if (!blog) return <BlogDetailEmpty />;

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ سكربت تويتر */}
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />

      <BlogDetailHero title={blog.title} coverImage={blog?.cover_image} />

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-secondary"
        >
          <BackArrow className="h-5 w-5" />
          <span>{t("backToAllArticles")}</span>
        </Link>

        <BlogDetailSummary
          title={blog.title}
          excerpt={blog.excerpt}
          image={blog.cover_image}
        />

        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          // ❌ شيلنا whitespace-pre-line
          className="max-w-none text-base leading-8 text-slate-700"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <BlogDetailRelated recommendedBlogs={recommendedBlogs} />
      </div>
    </div>
  );
}

export default BlogDetailPage;
