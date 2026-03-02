"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFaqs } from "@/hooks/api/faqs";
import { Faq } from "@/interfaces";
import { SkeletonCard } from "@/components/skeleton/card";
import Loader from "@/components/ui/loader";

function Faqs() {
  const t = useTranslations("home.faqs");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFaqs();

  const faqs: Faq[] = data?.pages?.flatMap((page) => page?.data ?? []) ?? [];

  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const activeFaqId = openFaqId === null ? (faqs[0]?.id ?? null) : openFaqId;

  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-secondary sm:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col gap-4">
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard
                key={index}
                className="h-24 rounded-3xl border border-slate-200 bg-slate-100"
              />
            ))}

          {!isLoading && faqs.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-slate-100 p-6 text-center text-secondary">
              {t("empty")}
            </div>
          )}

          {!isLoading &&
            faqs.map((faq) => {
              const isOpen = activeFaqId === faq.id;

              return (
                <article
                  key={faq.id}
                  className="rounded-3xl border border-slate-200 bg-slate-100 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpenFaqId((prev) => {
                        const currentActiveId =
                          prev === null ? (faqs[0]?.id ?? null) : prev;
                        return currentActiveId === faq.id ? -1 : faq.id;
                      });
                    }}
                    className="flex w-full items-center justify-between gap-4 px-8 py-7 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="text-xl font-semibold text-primary">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 shrink-0 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 shrink-0 text-primary" />
                    )}
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="px-8 pb-7 text-lg leading-relaxed text-secondary"
                    >
                      {faq.answer}
                    </div>
                  )}
                </article>
              );
            })}

          {!isLoading && hasNextPage && (
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="mx-auto mt-4 rounded-full border border-primary px-6 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isFetchingNextPage ? <Loader /> : t("load-more")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Faqs;
