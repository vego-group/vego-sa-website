"use client";

import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatDate } from "@/lib";
import { Blog } from "@/interfaces";

type RowActionsProps = {
  blogId: string | number;
};

type BlogsListProps = {
  blogs: Blog[];
};

type BlogsPaginationProps = {
  pageNumbers: number[];
  activePage: number;
  totalPages: number;
  isFetching: boolean;
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

function BlogStatusBadge({ status }: { status: string }) {
  if (status === "published") {
    return (
      <span className="inline-flex px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
        Published
      </span>
    );
  }

  return (
    <span className="inline-flex px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
      Draft
    </span>
  );
}

function RowActions({ blogId }: RowActionsProps) {
  return (
    <>
      <button
        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
        title="Edit"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
      <button
        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-400"
        title="Delete"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </>
  );
}

export function BlogsMobileList({ blogs }: BlogsListProps) {
  return (
    <div className="block lg:hidden divide-y divide-white/10">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="p-4 space-y-3 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-white line-clamp-2">
              {blog.title?.en || "Untitled"}
            </h3>
            <BlogStatusBadge
              status={
                blog.status === "publish" || blog.status === "published"
                  ? "published"
                  : "draft"
              }
            />
          </div>

          <p className="text-xs text-white/50 line-clamp-2">
            {blog.excerpt?.en || "-"}
          </p>

          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>
              {formatDate(blog.published_at ?? blog.created_at ?? null)}
            </span>
          </div>

          <div className="flex items-center justify-end gap-1 pt-2">
            <RowActions blogId={blog.id} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function BlogsDesktopTable({ blogs }: BlogsListProps) {
  return (
    <div className="hidden lg:block text-white/70 overflow-x-auto">
      <div className="min-w-200">
        <div className="grid grid-cols-11 gap-4 px-6 py-4 border-b border-white/10 text-xs font-medium text-white/50 uppercase tracking-wider">
          <div className="col-span-5">Title</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="divide-y divide-white/10">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="grid grid-cols-11 gap-4 px-6 py-5 hover:bg-white/5 transition-colors"
            >
              <div className="col-span-5">
                <h3 className="text-sm font-medium text-white mb-1 line-clamp-1">
                  {blog.title?.en || "Untitled"}
                </h3>
                <p className="text-xs text-white/50 line-clamp-1">
                  {blog.excerpt?.en || "-"}
                </p>
              </div>

              <div className="col-span-2">
                <BlogStatusBadge
                  status={
                    blog.status === "publish" || blog.status === "published"
                      ? "published"
                      : "draft"
                  }
                />
              </div>

              <div className="col-span-3">
                <span className="text-sm text-white/60">
                  {formatDate(blog.published_at ?? blog.created_at ?? null)}
                </span>
              </div>

              <div className="col-span-1 flex items-start justify-end gap-1">
                <RowActions blogId={blog.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogsPagination({
  pageNumbers,
  activePage,
  totalPages,
  isFetching,
  onPageChange,
  onPrev,
  onNext,
}: BlogsPaginationProps) {
  const [pagesSwiper, setPagesSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (!pagesSwiper) return;

    const activeIndex = pageNumbers.findIndex((page) => page === activePage);
    if (activeIndex >= 0) {
      pagesSwiper.slideTo(activeIndex, 250);
    }
  }, [activePage, pageNumbers, pagesSwiper]);

  if (totalPages <= 1) return null;

  return (
    <div className="px-4 sm:px-6 py-5 border-t border-white/10">
      <div className="mx-auto w-fit max-w-full rounded-[28px] border border-white/10 bg-white/5 px-2 py-2 sm:px-3 sm:py-3">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          <button
            onClick={onPrev}
            disabled={activePage === 1 || isFetching}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-base sm:text-lg font-semibold text-secondary hover:bg-secondary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            {"<"}
          </button>

          <div className="min-w-0 w-auto max-w-[55vw] sm:max-w-105">
            <Swiper
              onSwiper={setPagesSwiper}
              slidesPerView="auto"
              spaceBetween={6}
              className="w-full"
            >
              {pageNumbers.map((page) => (
                <SwiperSlide key={page} className="w-auto!">
                  <button
                    onClick={() => onPageChange(page)}
                    disabled={isFetching && page !== activePage}
                    className={`h-9 min-w-9 px-3 sm:h-10 sm:min-w-10 rounded-full text-sm font-semibold transition-colors ${
                      page === activePage
                        ? "bg-secondary text-primary shadow-sm"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    aria-current={page === activePage ? "page" : undefined}
                  >
                    {page}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            onClick={onNext}
            disabled={activePage === totalPages || isFetching}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-base sm:text-lg font-semibold text-secondary hover:bg-secondary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
