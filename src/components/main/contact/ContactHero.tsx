"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="relative h-[70vh] overflow-hidden bg-linear-to-br from-emerald-900 via-primary to-emerald-800">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/دراجة-خلفية.jpg"
          alt="VEGO Electric Motorcycle"
          fill
          priority
          quality={90}
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        {/* Main Title with Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
        >
          <span className="bg-linear-to-r from-emerald-300 to-white bg-clip-text text-transparent">
            دعنا نتواصل
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-emerald-100/80 sm:text-xl"
        >
          نحن هنا للإجابة على استفساراتك ومساعدتك في اختيار
          تجربة التنقّل الكهربائية المثالية.
        </motion.p>
      </div>
    </section>
  );
}