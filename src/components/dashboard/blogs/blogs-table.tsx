"use client";

import { useState } from "react";
import { useDashboardBlogs } from "@/hooks/api";
import {
  BlogsDesktopTable,
  BlogsMobileList,
  BlogsPagination,
} from "./blogs-table-ui";
import { Blog } from "@/interfaces";
import { SingleSkeletonCard } from "@/components/skeleton/card";

type BlogsTableProps = {
  activeTab?: "all" | "published" | "drafts";
  searchQuery?: string;
};

type BlogsTableContentProps = Required<BlogsTableProps>;

function BlogsTableContent({ activeTab, searchQuery }: BlogsTableContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching } = useDashboardBlogs(currentPage);
  const blogs: Blog[] = data?.data?.data ?? [];
  console.log(data?.data?.meta);
  const filteredBlogs = blogs.filter((item) => {
    const status =
      item.status === "publish" || item.status === "published"
        ? "published"
        : "draft";

    if (activeTab === "published" && status !== "published") return false;
    if (activeTab === "drafts" && status !== "draft") return false;

    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return Boolean(
      [item.title?.en, item.excerpt?.en].find((text) =>
        (text ?? "").toLowerCase().includes(query),
      ),
    );
  });
  const totalPages = Number(data?.data?.meta?.last_page ?? 1);
  const activePage = Number(data?.data?.meta?.current_page ?? currentPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (isLoading) {
    return <SingleSkeletonCard />;
  }

  return (
    <>
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12 sm:py-16 px-4">
          <p className="text-white/40 text-base sm:text-lg">No blogs found</p>
          <p className="text-white/20 text-xs sm:text-sm mt-2">
            Try changing the filter or create a new blog
          </p>
        </div>
      ) : (
        <>
          <BlogsMobileList blogs={filteredBlogs} />
          <BlogsDesktopTable blogs={filteredBlogs} />
        </>
      )}

      <BlogsPagination
        pageNumbers={pageNumbers}
        activePage={activePage}
        totalPages={totalPages}
        isFetching={isFetching}
        onPageChange={setCurrentPage}
        onPrev={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
      />
    </>
  );
}

function BlogsTable({ activeTab = "all", searchQuery = "" }: BlogsTableProps) {
  return (
    <BlogsTableContent
      key={`${activeTab}:${searchQuery}`}
      activeTab={activeTab}
      searchQuery={searchQuery}
    />
  );
}

export { BlogsTable };
