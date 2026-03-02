"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BlogGuest } from "@/interfaces/site/main/blogs";
import Image from "next/image";

type UserBlogGridProps = {
  blogs: BlogGuest[];
};

function UserBlogGrid({ blogs }: UserBlogGridProps) {
  const t = useTranslations("blogs");
  const locale = useLocale();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(
      locale === "en" ? "en-US" : "ar-SA",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    );

  if (blogs.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-slate-600">{t("empty.title")}</p>
        <p className="mt-2 text-sm text-slate-400">{t("empty.description")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog, index) => {
        const blogCoverImage = blog.cover_image?.trim() || "";

        return (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/10"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="relative block h-56 overflow-hidden bg-white"
            >
              <Image
                src={blogCoverImage || "/images/placeholder-logo.jpeg"}
                alt={blog.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`transition-transform duration-700 group-hover:scale-110 ${
                  blogCoverImage ? "object-cover" : "object-contain p-6"
                }`}
              />
            </Link>

            <div className="p-6">
              <Link href={`/blogs/${blog.id}`}>
                <h2 className="mb-3 line-clamp-2 text-xl font-semibold text-primary transition-colors group-hover:text-secondary">
                  {blog.title}
                </h2>
              </Link>

              <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="h-3 w-3" />
                  {formatDate(blog.created_at)}
                </span>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="group/link inline-flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-secondary/80"
                >
                  {t("actions.readMore")}
                  <Arrow className="size-4" />
                </Link>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

export { UserBlogGrid };
