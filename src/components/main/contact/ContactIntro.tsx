"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ContactIntro() {
  const t = useTranslations("contact.intro"); // جلب الترجمة

  return (
    <section>
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl relative"
        >
          {t("title")}
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
        >
          {t.rich("description", {
            bold: (chunks: React.ReactNode) => (
              <span className="text-primary font-medium">{chunks}</span>
            ),
          })}
        </motion.p>

        {/* Extra spacing before next section */}
        <div className="mt-12" />
      </div>
    </section>
  );
}
