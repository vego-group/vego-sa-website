"use client";

import { motion } from "framer-motion";
import { listItemVariants, sectionVariants } from "@/data";
import type { CookiesPolicySection } from "@/interfaces/site/main/cookie-policy";

type CookiesPolicySectionCardProps = {
  section: CookiesPolicySection;
};

function getToneClasses(tone: CookiesPolicySection["tone"]) {
  if (tone === "secondary") {
    return {
      border: "border-secondary/15",
      bar: "bg-secondary",
      bullet: "bg-secondary",
      bulletWrapper: "border-secondary/15 bg-secondary/8",
      itemWrapper: "border-secondary/10 bg-secondary/6",
    };
  }

  return {
    border: "border-primary/10",
    bar: "bg-primary",
    bullet: "bg-primary",
    bulletWrapper: "border-primary/10 bg-primary/5",
    itemWrapper: "border-primary/10 bg-primary/5",
  };
}

export default function CookiesPolicySectionCard({
  section,
}: CookiesPolicySectionCardProps) {
  const toneClasses = getToneClasses(section.tone);

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`rounded-[2rem] border bg-white p-7 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_-36px_rgba(13,22,63,0.35)] md:p-8 ${
        toneClasses.border
      } ${section.featured ? "lg:col-span-2" : ""}`}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
          {section.title}
        </h3>
        <div className={`mt-3 h-1 w-20 rounded-full ${toneClasses.bar}`} />
      </div>

      {section.description ? (
        <p className="mb-5 text-base leading-8 text-primary/80 md:text-lg">
          {section.description}
        </p>
      ) : null}

      {section.items?.length ? (
        <div className="space-y-4">
          {section.items.map((item) => (
            <div
              key={item.label}
              className={`rounded-3xl border p-5 ${toneClasses.itemWrapper}`}
            >
              <p className="text-lg font-semibold text-primary">{item.label}</p>
              <p className="mt-2 text-base leading-8 text-primary/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {section.bullets?.length ? (
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-3"
        >
          {section.bullets.map((bullet) => (
            <motion.li
              key={bullet}
              variants={listItemVariants}
              className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-primary ${toneClasses.bulletWrapper}`}
            >
              <span
                className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${toneClasses.bullet}`}
              />
              <span className="text-sm leading-7 md:text-base">{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>
      ) : null}
    </motion.section>
  );
}
