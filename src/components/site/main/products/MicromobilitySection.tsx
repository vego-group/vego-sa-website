"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

function MicromobilitySection() {
  const t = useTranslations("products.micromobility");

  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 md:flex-row md:items-center">
        {/* Image Side */}
        <div className="md:w-1/2">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-2xl shadow-primary/20">
            <Image
              src="/images/المايكروموبلتي.jpg"
              alt="VEGO Micromobility Solutions"
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-linear-to-tl from-primary/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Content Side */}
        <div className="space-y-8 md:w-1/2">
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-secondary to-blue-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                <svg
                  className="h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("badge")}
              </span>
              <h2 className="mt-6 font-serif text-4xl font-bold tracking-tight text-primary sm:text-5xl">
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
          <div className="rounded-3xl bg-linear-to-br from-slate-50 to-white p-8 shadow-xl">
            <h3 className="mb-6 font-serif text-2xl font-semibold text-primary">
              {t("features.title")}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { key: "eco-friendly", icon: "♻️" },
                { key: "battery-tech", icon: "🔋" },
                { key: "urban-design", icon: "🏙️" },
                { key: "gps-tracking", icon: "📍" },
                { key: "fast-charging", icon: "⚡" },
                { key: "low-cost", icon: "💰" },
              ].map((feature) => (
                <div key={feature.key} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-100 to-blue-100 text-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {t(`features.${feature.key}`)}
                    </h4>
                    <div className="mt-1 h-1 w-8 rounded-full bg-linear-to-r from-secondary to-blue-400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
              {[
                { value: "60%", label: t("stats.commute") },
                { value: "0g/km", label: t("stats.emissions") },
                { value: "85%", label: t("stats.cost-saving") },
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

export default MicromobilitySection;
