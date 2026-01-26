"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

function ChargingSystemsSection() {
  const t = useTranslations("products.charging-systems");

  return (
    <section className="py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 md:flex-row md:items-center">
        <div className="md:w-1/2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-primary/20">
            <Image
              src="/images/أنظمة الشحن.jpg"
              alt="VEGO Charging Systems"
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Content Side */}
        <div className="space-y-8 md:w-1/2">
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("badge")}
              </span>

              <h2 className="mt-6 font-serif text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {t("title")}
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
                {t("intro-1")}
              </p>

              <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
                {t("intro-2")}
              </p>
            </div>
          </div>

          {/* Charging Methods */}
          <div className="space-y-6">
            <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-50/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {t("home-title")}
                </h3>
              </div>
              <p className="mt-3 text-slate-700">
                {t("home-desc")}
              </p>
            </div>

            <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {t("fast-title")}
                </h3>
              </div>
              <p className="mt-3 text-slate-700">
                {t("fast-desc")}
              </p>
            </div>

            <div className="rounded-2xl border-l-4 border-blue-500 bg-blue-50/50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {t("swap-title")}
                </h3>
              </div>
              <p className="mt-3 text-slate-700">
                {t("swap-desc")}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-white p-8 shadow-xl">
            <p className="text-center text-lg font-medium text-slate-800">
              {t("summary")}
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
              {[
                { value: "80%", label: t("stats.fast") },
                { value: "99.9%", label: t("stats.uptime") },
                { value: "100%", label: t("stats.compatible") }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ChargingSystemsSection;
