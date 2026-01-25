"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

function DeliverySolutions() {
  const t = useTranslations("products.delivery-solutions");

  return (
    <section className="py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 md:flex-row-reverse md:items-center">
        {/* Image Side */}
        <div className="md:w-1/2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-primary/20">
            <Image
              src="/images/حلول التوصيل.jpg"
              alt="VEGO Intelligent Delivery Solutions"
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Content Side */}
        <div className="space-y-8 md:w-1/2">
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414z"
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

              <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
                {t("intro-3")}
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-white p-8 shadow-xl">
            <h3 className="mb-6 font-serif text-2xl font-semibold text-slate-900">
              {t("features.title")}
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                { key: "tracking", icon: "📍" },
                { key: "battery", icon: "⚡" },
                { key: "analytics", icon: "📊" },
                { key: "devices", icon: "📱" },
                { key: "sustainability", icon: "🌱" }
              ].map((feature) => (
                <div key={feature.key} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-emerald-100 text-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {t(`features.${feature.key}`)}
                    </h4>
                    <div className="mt-1 h-1 w-8 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
              {[
                { value: "40%", label: t("stats.cost") },
                { value: "99%", label: t("stats.reliability") },
                { value: "24/7", label: t("stats.support") }
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

export default DeliverySolutions;
