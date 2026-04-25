"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type BlogsHeroProps = {
  title: string;
  description: string;
};

function BlogsHero({ title, description }: BlogsHeroProps) {
  return (
    <section className="relative h-[60vh] overflow-hidden bg-linear-to-br from-emerald-900 via-primary to-emerald-800">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-6"
        >
          <Sparkles className="h-16 w-16 text-secondary/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
        >
          <span className="bg-linear-to-r from-emerald-300 to-white bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-emerald-100/80 sm:text-xl"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}

export { BlogsHero };
