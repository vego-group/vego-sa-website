"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock3, ShieldCheck } from "lucide-react";

import type { TestDriveBenefitsProps } from "@/interfaces";

const benefitIcons = [BadgeCheck, Clock3, ShieldCheck];

function TestDriveBenefits({ copy, benefits }: TestDriveBenefitsProps) {
  return (
    <section className="relative">
      <div className="absolute inset-x-0 top-8 h-56 bg-linear-to-r from-primary/6 via-secondary/10 to-primary/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="text-start">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
            {copy.benefitsTitle}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-primary sm:text-4xl">
            {copy.formTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            {copy.benefitsDescription}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];

            return (
              <motion.article
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, delay: index * 0.12 }}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-secondary to-primary" />
                <div className="inline-flex rounded-2xl bg-primary p-3 text-white shadow-lg shadow-primary/20">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-primary">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {benefit.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TestDriveBenefits;
