"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Fuel } from "lucide-react";

import type { MotorcycleComparisonCard } from "@/interfaces";
import { useLocale } from "next-intl";

interface ElectricVsPetrolMotorcycleCardProps {
  card: MotorcycleComparisonCard;
  index: number;
  totalLabel: string;
  getText: (key: string) => string;
}

function ElectricMotorcycleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6 text-primary sm:size-7"
    >
      <path
        d="M13.5 2.5L4.5 14h6l-1 7.5 9-11.5h-6l1-7.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function ElectricVsPetrolMotorcycleCard({
  card,
  index,
  totalLabel,
  getText,
}: ElectricVsPetrolMotorcycleCardProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.5rem] border p-4 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.5)] transition duration-300 hover:-translate-y-1 sm:rounded-[2rem] sm:p-6 lg:p-7 ${
        card.highlight
          ? "border-secondary/30 bg-linear-to-br from-secondary/10 via-white to-white"
          : "border-slate-200 bg-white"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 ${
          card.highlight
            ? "bg-linear-to-r from-secondary via-primary to-secondary"
            : "bg-linear-to-r from-primary via-secondary to-primary"
        }`}
      />

      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary sm:text-sm">
            {getText(`cards.${card.key}.label`)}
          </p>

          <h3 className="mt-3 text-2xl font-black leading-tight text-primary sm:text-3xl">
            {getText(`cards.${card.key}.title`)}
          </h3>
        </div>

        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-2xl sm:size-14 ${
            card.highlight
              ? "bg-secondary text-primary shadow-lg shadow-secondary/20"
              : "bg-primary text-white shadow-lg shadow-primary/20"
          }`}
        >
          {card.key === "electric" ? (
            <ElectricMotorcycleIcon />
          ) : (
            <Fuel className="size-6 sm:size-7" />
          )}
        </div>
      </div>

      <div className="mt-7 flex-1 space-y-3 sm:mt-8 sm:space-y-4">
        {card.items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="size-2.5 shrink-0 rounded-full bg-secondary" />

              <span className="min-w-0 text-sm font-bold text-slate-700 sm:text-base">
                {getText(`cards.${card.key}.items.${item.key}.label`)}
              </span>
            </div>

            <span className="whitespace-nowrap ps-5 text-lg font-black text-primary sm:ps-0 sm:text-end">
              {getText(`cards.${card.key}.items.${item.key}.value`)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-primary/10 bg-primary px-4 py-3 text-white sm:mt-auto sm:rounded-[1.5rem] sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="shrink-0 text-sm font-black sm:text-lg">{totalLabel}</p>

          <div className="flex items-center gap-2 sm:gap-3">
            <ArrowIcon className="size-4 shrink-0 text-secondary sm:size-5" />

            <p className="whitespace-nowrap text-xl font-black text-secondary sm:text-2xl">
              {getText(`cards.${card.key}.total`)}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ElectricVsPetrolMotorcycleCard;
