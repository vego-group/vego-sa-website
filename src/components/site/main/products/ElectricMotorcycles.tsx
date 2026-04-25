"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";

function ElectricMotorcycles() {
  const t = useTranslations("products.electric-motorcycles");
  const locale = useLocale();
  const Arrow = locale === "en" ? ArrowRight : ArrowLeft;
  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:flex-row md:items-center">
        {/* Image Side */}
        <div className="md:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src="/images/دراجات فيجو الكهربائية.jpg"
              alt="VEGO Electric Motorcycle"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="space-y-6 md:w-1/2">
          <div>
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-800">
              {t("badge")}
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              {t("title")}
            </h2>
          </div>

          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            {t("description")}
          </p>

          <div className="pt-4">
            <Link
              href={`https://vegobike.com/${locale}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:bg-emerald-600"
            >
              {t("learn-more")}
              <Arrow className="size-4" />
            </Link>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            {t.raw("features").map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <svg
                    className="h-3 w-3 text-emerald-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ElectricMotorcycles;
