"use client";

import { motion } from "framer-motion";
import { heroContainerVariants, heroItemVariants } from "@/data";
import type { CookiesPolicyHeroContent } from "@/interfaces/site/main/cookie-policy";

type CookiesPolicyHeroProps = {
  hero: CookiesPolicyHeroContent;
};

export default function CookiesPolicyHero({ hero }: CookiesPolicyHeroProps) {
  return (
    <section className="relative h-[60vh] overflow-hidden bg-linear-to-br from-emerald-950 via-primary to-emerald-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(27,217,137,0.2),transparent_34%)]" />
      <div className="absolute inset-0 bg-black/35" />

      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 py-24 text-center"
      >
        <motion.p
          variants={heroItemVariants}
          className="text-sm font-semibold tracking-[0.22em] text-white/75 uppercase"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={heroItemVariants}
          className="mt-5 max-w-4xl font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          <span className="bg-linear-to-r from-white via-white to-emerald-200 bg-clip-text text-transparent">
            {hero.title}
          </span>
        </motion.h1>

        <motion.p
          variants={heroItemVariants}
          className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/85 sm:text-xl"
        >
          {hero.description}
        </motion.p>
      </motion.div>
    </section>
  );
}
