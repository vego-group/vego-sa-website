"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ProductsHero() {
  const t = useTranslations("products.hero");

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-emerald-900 via-primary to-emerald-800">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/products-hero-luxury.jpg"
          alt="VEGO Electric Mobility"
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block rounded-full border border-emerald-400/40 px-6 py-2 text-xs tracking-widest text-emerald-200"
        >
          {t("badge")}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-r from-emerald-300 to-white bg-clip-text text-transparent">
            {t("title")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-emerald-100/80 sm:text-xl"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10"
        >
          <button className="rounded-full bg-emerald-600 px-10 py-4 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:scale-105">
            {t("cta")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}