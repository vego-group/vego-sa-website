"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type BlogDetailSummaryProps = {
  title: string;
  excerpt: string;
  image: string | null;
};

function BlogDetailSummary({ title, excerpt, image }: BlogDetailSummaryProps) {
  const coverImage = image?.trim() || "";

  return (
    <section className="mb-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 overflow-hidden rounded-[28px] bg-white shadow-xl shadow-slate-300/50"
      >
        <div className="relative aspect-[16/7] w-full">
          <Image
            src={coverImage || "/images/placeholder-logo.jpeg"}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 1024px"
            className={coverImage ? "object-cover" : "object-contain p-8"}
          />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-3 text-2xl font-bold text-primary"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-base leading-7 text-slate-600"
      >
        {excerpt}
      </motion.p>
    </section>
  );
}

export { BlogDetailSummary };
