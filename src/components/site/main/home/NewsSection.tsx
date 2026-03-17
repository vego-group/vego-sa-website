"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BlogGuest } from "@/interfaces/site/main/blogs";
import { useBlogs } from "@/hooks/api";
import { UserBlogGrid } from "../blogs";
import NewsLoadingGrid from "./NewsLoadingGrid";

function NewsSection() {
  const t = useTranslations("home.news");
  const blogsT = useTranslations("blogs");
  const { data, isLoading } = useBlogs();

  const blogs: BlogGuest[] =
    data?.pages?.flatMap((page) => page?.data ?? []) ?? [];
  const slicedBlogs = blogs.slice(0, 3);
  const hasBlogs = blogs.length > 0;
  const showMoreButton = blogs.length > 3;

  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>

          {showMoreButton ? (
            <Link
              href="/blogs"
              className="inline-block rounded-full border border-primary px-6 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              {t("more")}
            </Link>
          ) : null}
        </div>

        {isLoading ? (
          <NewsLoadingGrid />
        ) : hasBlogs ? (
          <UserBlogGrid blogs={slicedBlogs} />
        ) : (
          <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-14 shadow-sm sm:px-10">
            <div className="mx-auto flex max-w-xl flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/5 ring-1 ring-primary/10">
                <div className="relative h-9 w-11 rounded-xl border-2 border-primary/20 bg-white">
                  <span className="absolute left-1/2 top-2 h-1.5 w-5 -translate-x-1/2 rounded-full bg-primary/20" />
                  <span className="absolute left-1/2 top-5 h-1.5 w-7 -translate-x-1/2 rounded-full bg-slate-200" />
                </div>
              </div>

              <span className="inline-flex rounded-full bg-primary/5 px-4 py-2 text-xs font-semibold text-primary ring-1 ring-primary/10">
                {t("title")}
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-slate-900 sm:text-3xl">
                {blogsT("empty.title")}
              </h3>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsSection;
