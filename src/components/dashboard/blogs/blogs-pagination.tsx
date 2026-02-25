"use client";

import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

type BlogsPaginationProps = {
  pageNumbers: number[];
  activePage: number;
  totalPages: number;
  isFetching: boolean;
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

function BlogsPagination({
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
      <div className="mx-auto w-fit max-w-full rounded-[28px] border border-white/10 bg-white/5 px-2 py-2 sm:px-3">
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

export { BlogsPagination };
