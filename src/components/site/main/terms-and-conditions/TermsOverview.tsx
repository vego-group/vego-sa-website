"use client";

import type { TermsOverviewContent } from "@/types";

type TermsOverviewProps = {
  overview: TermsOverviewContent;
  isArabic: boolean;
};

export default function TermsOverview({
  overview,
  isArabic,
}: TermsOverviewProps) {
  return (
    <div className="mb-12 grid gap-6 rounded-[2rem] border border-slate-200 bg-linear-to-r from-slate-50 to-emerald-50/60 p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className={isArabic ? "text-right" : "text-left"}>
        <p className="text-sm font-semibold tracking-[0.18em] text-emerald-600 uppercase">
          {overview.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {overview.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {overview.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {overview.highlights.map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-white bg-white/80 px-5 py-4 text-sm font-semibold text-slate-700 shadow-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
