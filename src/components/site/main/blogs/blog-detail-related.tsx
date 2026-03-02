"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useBlogs } from "@/hooks/api";
import { Link } from "@/i18n/navigation";
import { BlogGuest } from "@/interfaces/site/main/blogs";

type BlogDetailRelatedProps = {
  currentBlogId: number;
};

function BlogDetailRelated({ currentBlogId }: BlogDetailRelatedProps) {
  const t = useTranslations("blogs-detail");
  const { data } = useBlogs();

  const blogs: BlogGuest[] =
    data?.pages?.flatMap((page) => page?.data ?? [])?.filter(Boolean) ?? [];

  const related = blogs
    .filter((item) => item.id !== currentBlogId)
    .slice(0, 3);

  const placeholders = [1, 2, 3];
  const cards = related.length > 0 ? related : placeholders;

  return (
    <section className="mt-16">
      <h3 className="mb-8 text-center text-3xl font-extrabold text-primary">
        {t("relatedBlogs")}
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((item, index) => {
          const isBlog = typeof item === "object";
          const key = isBlog ? item.id : `placeholder-${index}`;
          const blogItem = isBlog ? (item as BlogGuest) : null;
          const imageSrc =
            blogItem?.cover_image?.trim() || "/images/placeholder-logo.jpeg";

          const CardInner = (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl bg-slate-100"
            >
              <div className="relative h-44 w-full overflow-hidden bg-white">
                <Image
                  src={imageSrc}
                  alt={blogItem?.title || t("relatedBlogPlaceholder")}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className={`${
                    blogItem?.cover_image ? "object-cover" : "object-contain p-7"
                  }`}
                />
              </div>

              <div className="bg-slate-100 px-6 py-5">
                <h4 className="line-clamp-1 text-center text-2xl font-bold text-primary">
                  {blogItem?.title || t("relatedBlogPlaceholder")}
                </h4>
              </div>
            </motion.article>
          );

          if (!isBlog) {
            return <div key={key}>{CardInner}</div>;
          }

          return (
            <Link key={key} href={`/blogs/${blogItem!.id}`} className="block">
              {CardInner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export { BlogDetailRelated };
