"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { sectionVariants } from "@/data";

export default function AboutJourney() {
  const t = useTranslations("about.journey");

  return (
    <section id="journey-section" className="bg-white py-24">
      <motion.div
        className="mx-auto max-w-4xl px-6 text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("title")}
        </motion.h2>

        <motion.h3
          className="text-2xl md:text-3xl font-semibold text-emerald-500 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t("subtitle")}
        </motion.h3>

        <motion.p
          className="text-lg md:text-xl text-slate-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("description")}
        </motion.p>
      </motion.div>
    </section>
  );
}
