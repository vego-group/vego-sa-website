"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Target, Eye } from "lucide-react";
import { sectionVariants } from "@/data";

export default function AboutMissionVision() {
  const t = useTranslations("about.missionVision");

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl px-6"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div
            className="rounded-3xl bg-emerald-50 p-10 border border-emerald-100 shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            dir="rtl"
          >
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">
                {t("mission.title")}
              </h3>
            </div>

            <p className="text-lg leading-relaxed text-slate-700">
              {t("mission.description")}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="rounded-3xl bg-slate-900 p-10 text-white text-center shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            dir="rtl"
          >
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 text-slate-900">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold">{t("vision.title")}</h3>
            </div>

            <p className="text-lg leading-relaxed text-slate-300">
              {t("vision.description")}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
