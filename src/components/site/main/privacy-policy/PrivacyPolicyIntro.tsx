import { motion } from "framer-motion";
import { listItemVariants, sectionVariants } from "@/data";
import type { PrivacyPolicyIntroContent } from "@/types";

type PrivacyPolicyIntroProps = {
  intro: PrivacyPolicyIntroContent;
  isArabic: boolean;
};

export default function PrivacyPolicyIntro({
  intro,
  isArabic,
}: PrivacyPolicyIntroProps) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-6 rounded-[2rem] border border-slate-200 bg-linear-to-r from-slate-50 to-emerald-50/60 p-8 shadow-sm lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
    >
      <div className={isArabic ? "text-right" : "text-left"}>
        <p className="text-sm font-semibold tracking-[0.18em] text-emerald-600">
          {intro.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {intro.title}
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          {intro.description}
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-4"
      >
        {intro.highlights.map((highlight) => (
          <motion.div
            key={highlight}
            variants={listItemVariants}
            className="rounded-3xl border border-white bg-white/85 px-5 py-4 text-sm font-medium leading-7 text-slate-700 shadow-sm"
          >
            {highlight}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
