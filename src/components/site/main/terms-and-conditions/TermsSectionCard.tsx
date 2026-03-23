"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  FileText,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { listItemVariants, sectionVariants } from "@/data";
import type { TermsIconName, TermsSectionBlock } from "@/types";

type TermsSectionCardProps = {
  section: TermsSectionBlock;
};

const iconMap: Record<TermsIconName, typeof ShieldCheck> = {
  "shield-check": ShieldCheck,
  "file-text": FileText,
  "alert-triangle": AlertTriangle,
  landmark: Landmark,
};

export default function TermsSectionCard({
  section,
}: TermsSectionCardProps) {
  const Icon = iconMap[section.icon];

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_-36px_rgba(13,22,63,0.4)] md:p-8 ${
        section.featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="rounded-2xl bg-primary/8 p-3 text-primary">
          <Icon className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {section.title}
          </h3>
          <div className="mt-3 h-1 w-20 rounded-full bg-secondary" />
        </div>
      </div>

      {section.paragraphs?.length ? (
        <div className="space-y-4">
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-8 text-slate-600 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {section.items?.length ? (
        <div className="space-y-4">
          {section.items.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200/70"
            >
              <p className="text-lg font-semibold text-slate-900">
                {item.label}
              </p>
              <p className="mt-2 text-base leading-8 text-slate-600">
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
          className="mt-6 grid gap-3"
        >
          {section.bullets.map((bullet) => (
            <motion.li
              key={bullet}
              variants={listItemVariants}
              className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-slate-700"
            >
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" />
              <span className="text-sm leading-7 md:text-base">{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>
      ) : null}
    </motion.section>
  );
}
