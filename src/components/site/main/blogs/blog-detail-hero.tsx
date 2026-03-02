"use client";

import { motion } from "framer-motion";

type BlogDetailHeroProps = {
  title: string;
  excerpt: string;
};

function BlogDetailHero({ title, excerpt }: BlogDetailHeroProps) {
  return (
    <section className="relative h-[65vh] overflow-hidden bg-linear-to-br from-emerald-900 via-primary to-emerald-800">
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />

      <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="line-clamp-3 px-2 text-xl font-bold text-white sm:text-2xl md:text-3xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-2 line-clamp-3 max-w-2xl text-sm text-white/80 sm:text-base"
        >
          {excerpt}
        </motion.p>
      </div>
    </section>
  );
}

export { BlogDetailHero };
