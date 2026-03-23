"use client";

import { motion } from "framer-motion";
import type { TermsHeroContent } from "@/types";

type TermsHeroProps = {
  hero: TermsHeroContent;
};

export default function TermsHero({ hero }: TermsHeroProps) {
  return (
    <section className="relative h-[70vh] overflow-hidden bg-linear-to-br from-emerald-900 via-primary to-emerald-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(27,217,137,0.22),transparent_32%)]" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="bg-linear-to-r from-emerald-300 via-white to-emerald-200 bg-clip-text text-transparent">
              {hero.title}
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-emerald-50/85 sm:text-lg">
            {hero.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
