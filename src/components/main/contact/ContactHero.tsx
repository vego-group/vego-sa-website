"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ContactHero() {
  const t = useTranslations("contact.hero");

  return (
    <section className="relative h-[70vh] overflow-hidden bg-gradient-to-br from-emerald-900 via-primary to-emerald-800">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/دراجة-خلفية.jpg"
          alt="VEGO Electric Motorcycle"
          fill
          priority
          quality={90}
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
        >
          <span className="bg-gradient-to-r from-emerald-300 to-white bg-clip-text text-transparent">
            {t("title")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-emerald-100/80 sm:text-xl"
        >
          {t("subtitle")}
        </motion.p>
      </div>
    </section>
  );
}
