"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { sectionVariants } from "@/data";
import { Sparkles, Leaf, Award, Users } from "lucide-react";

function AboutValues() {
  const t = useTranslations("about.values");

  const values = [
    { key: "innovation", icon: Sparkles },
    { key: "sustainability", icon: Leaf },
    { key: "quality", icon: Award },
    { key: "customer-focus", icon: Users },
  ];

  return (
    <section 
      className="relative"
      style={{
        backgroundColor: "lab(97.8462% -6.94963 1.85487)"
      }}
    >
      <motion.div
        className="mx-auto max-w-6xl px-6 py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wide text-secondary shadow-sm">
            {t("badge")}
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            {t("description")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.key}
                className="group rounded-2xl bg-white p-8 text-center shadow-lg shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-200/30 hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 transition-all duration-500 group-hover:bg-emerald-100 group-hover:scale-110">
                  <Icon className="h-10 w-10 text-emerald-700 transition-all duration-500 group-hover:text-emerald-800 group-hover:h-11 group-hover:w-11" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {t(`items.${value.key}.title`)}
                </h3>
                <p className="mt-3 text-slate-600">
                  {t(`items.${value.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export default AboutValues;