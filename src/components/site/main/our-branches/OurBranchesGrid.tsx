"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { sectionVariants } from "@/data";
import { branches } from "@/data";

function OurBranchesGrid() {
  const t = useTranslations("our-branches.branches");

  return (
    <section>
      <motion.div
        className="mx-auto flex max-w-6xl flex-col gap-10 px-6"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-secondary">
            {t("badge")}
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch, index) => (
            <motion.article
              key={branch.key}
              className="group relative min-h-64 overflow-hidden rounded-3xl shadow-lg shadow-slate-200/60"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image
                src={branch.image}
                alt={t(`items.${branch.key}.image-alt`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-linear-to-b from-slate-900/25 via-slate-900/35 to-slate-900/80" />

              <div className="relative flex h-full flex-col justify-end p-6 text-white">
                <span className="inline-flex w-fit items-center rounded-full bg-secondary/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {t(`items.${branch.key}.tag`)}
                </span>
                <h3 className="mt-4 text-2xl font-semibold">
                  {t(`items.${branch.key}.title`)}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-emerald-200">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>{t(`items.${branch.key}.location`)}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default OurBranchesGrid;
