"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarClock, Sparkles } from "lucide-react";

import type { TestDriveHeroProps } from "@/interfaces";

function TestDriveHero({ copy, metrics, locale }: TestDriveHeroProps) {
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(27,217,137,0.28),_transparent_28%),linear-gradient(135deg,_#07102f_0%,_#0d163f_45%,_#0c2d54_100%)]">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-[-12%] w-80 rounded-full bg-secondary/18 blur-3xl" />
        <div className="absolute right-[-10%] top-12 h-72 w-72 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[70vh] max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-start"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-5 py-2 text-sm font-medium text-white/85 backdrop-blur-md">
            <Sparkles className="size-4 text-secondary" />
            {copy.badge}
          </div>

          <h1 className="mt-7 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            {copy.description}
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-secondary/30 bg-secondary/12 px-5 py-3 text-sm font-semibold text-secondary">
            <CalendarClock className="size-4" />
            {copy.statsLabel}
            <Arrow className="size-4" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-linear-to-br from-secondary/35 via-white/10 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-6 shadow-[0_30px_80px_-38px_rgba(4,10,30,0.95)] backdrop-blur-xl sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}
                  className="rounded-3xl border border-white/10 bg-slate-950/25 p-5"
                >
                  <p className="text-3xl font-black tracking-tight text-white">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-linear-to-r from-white/8 to-transparent p-5">
              <p className="text-sm leading-7 text-slate-200">{copy.heroNote}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestDriveHero;
