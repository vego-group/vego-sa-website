"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BlogGuest } from "@/interfaces/site/main/blogs";
import { useBlogs } from "@/hooks/api";
import { UserBlogGrid } from "../blogs";
import NewsLoadingGrid from "./NewsLoadingGrid";

function NewsSection() {
  const t = useTranslations("home.news");
  const { data, isLoading } = useBlogs();

  const blogs: BlogGuest[] =
    data?.pages?.flatMap((page) => page?.data ?? []) ?? [];
  const slicedBlogs = blogs.slice(0, 3);
  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>

          {/* استبدلنا الـ button العادي بـ Link */}
          <Link
            href="/blogs"
            className="rounded-full border border-primary px-6 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white inline-block"
          >
            {t("more")}
          </Link>
        </div>
        {isLoading ? <NewsLoadingGrid /> : <UserBlogGrid blogs={slicedBlogs} />}
      </div>
    </section>
  );
}

export default NewsSection;
