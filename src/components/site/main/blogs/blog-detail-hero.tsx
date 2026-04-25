"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type BlogDetailHeroProps = {
  title: string;
  coverImage: string | null;
};

function BlogDetailHero({ title, coverImage }: BlogDetailHeroProps) {
  const heroImage = coverImage?.trim() || "/images/placeholder-logo.jpeg";

  return (
    <section className="relative h-[65vh] overflow-hidden bg-linear-to-br from-emerald-900 via-primary to-emerald-800">
      <Image
        src={heroImage}
        alt={title}
        fill
        unoptimized
        priority
        sizes="100vw"
        className={`${
          coverImage?.trim() ? "" : "object-contain bg-white p-10"
        }`}
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/45 to-black/75" />

      <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="line-clamp-3 px-2 text-xl font-bold text-white sm:text-2xl md:text-3xl"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}

export { BlogDetailHero };
