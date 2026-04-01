"use client";

import { motion } from "framer-motion";
import { listItemVariants, sectionVariants } from "@/data";
import type { CookiePolicyIntroContent } from "@/interfaces/site/main/cookie-policy";

type CookiePolicyIntroProps = {
  intro: CookiePolicyIntroContent;
  isArabic: boolean;
};

export default function CookiePolicyIntro({
  intro,
  isArabic,
}: CookiePolicyIntroProps) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-6 rounded-[2rem] border border-primary/10 bg-gradient-to-r from-white to-secondary/10 p-8 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.25)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
    >
      <div className={isArabic ? "text-right" : "text-left"}>
        <p className="text-sm font-semibold tracking-[0.18em] text-secondary uppercase">
          {intro.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary md:text-4xl">
          {intro.title}
        </h2>
        <p className="mt-4 text-base leading-8 text-primary/80 md:text-lg">
          {intro.description}
        </p>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4"
      >
        {intro.highlights.map((highlight) => (
          <motion.li
            key={highlight}
            variants={listItemVariants}
            className="rounded-3xl border border-secondary/20 bg-white px-5 py-4 text-sm leading-7 text-primary shadow-sm"
          >
            <span className="font-semibold text-secondary">- </span>
            {highlight}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
