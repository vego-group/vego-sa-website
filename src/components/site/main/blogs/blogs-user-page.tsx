"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useBlogs } from "@/hooks/api";
import { BlogGuest } from "@/interfaces/site/main/blogs";
import { UserBlogSearch } from "./user-blog-search";
import { UserBlogGrid } from "./user-blog-grid";
import { BlogsHero } from "./blogs-hero";
import { BlogsLoadingGrid } from "./blogs-loading-grid";
import { BlogsShowMoreButton } from "./blogs-show-more-button";

function UserBlogPage() {
  const t = useTranslations("blogs");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useBlogs();

  const blogs: BlogGuest[] =
    data?.pages?.flatMap((page) => page?.data ?? []) ?? [];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredBlogs = normalizedQuery
    ? blogs.filter((blog) =>
        [blog.title, blog.excerpt, blog.content].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      )
    : blogs;

  return (
    <div className="min-h-screen bg-white">
      <BlogsHero title={t("hero.title")} description={t("hero.description")} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mx-auto mb-16 max-w-4xl">
          <UserBlogSearch onSearch={setSearchQuery} value={searchQuery} />
        </div>

        <div className="mt-16">
          {isLoading ? (
            <BlogsLoadingGrid />
          ) : (
            <>
              <UserBlogGrid blogs={filteredBlogs} />
              <BlogsShowMoreButton
                hasNextPage={Boolean(hasNextPage)}
                isLoading={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                label={t("actions.showMore")}
                loadingLabel={t("actions.loading")}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserBlogPage;
