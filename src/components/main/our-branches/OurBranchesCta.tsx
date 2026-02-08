"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { sectionVariants } from "@/data";

function OurBranchesCta() {
  const t = useTranslations("our-branches.cta");

  return (
    <section className="bg-emerald-50">
      <motion.div
        className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.span
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wide text-secondary shadow-sm"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.6 }}
        >
          {t("badge")}
        </motion.span>
        <motion.h2
          className="mt-6 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          {t("description")}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.26 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <button
            type="button"
            className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
          >
            {t("primary")}
          </button>
          <button
            type="button"
            className="rounded-full border border-secondary/40 bg-white px-7 py-3 text-sm font-semibold text-secondary transition hover:border-secondary hover:text-emerald-700"
          >
            {t("secondary")}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default OurBranchesCta;
