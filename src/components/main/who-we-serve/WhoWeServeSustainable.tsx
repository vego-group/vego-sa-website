"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { sectionVariants, stats } from "@/data";

function WhoWeServeSustainable() {
  const t = useTranslations("who-we-serve");
  return (
    <section className="relative overflow-hidden bg-secondary/10">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-secondary/15" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-secondary/15" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
        <motion.h2
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl md:text-5xl"
        >
          {t("sustainable.title")}{" "}
          <span className="text-secondary">{t("sustainable.highlight")}</span>
        </motion.h2>
        <motion.p
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
        >
          {t("sustainable.description")}
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {stats.map((statKey) => (
            <motion.div
              key={statKey}
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-2xl border border-emerald-100 bg-white px-6 py-8 text-center shadow-lg shadow-emerald-100/40"
            >
              <p className="text-2xl font-semibold text-primary">
                {t(`sustainable.stats.${statKey}.value`)}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t(`sustainable.stats.${statKey}.label`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoWeServeSustainable;
