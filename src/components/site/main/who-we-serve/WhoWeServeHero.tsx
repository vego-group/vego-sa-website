"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { heroContainerVariants } from "@/data";

function WhoWeServeHero() {
  const t = useTranslations("who-we-serve.hero");
  return (
    <section className="relative overflow-hidden h-[70vh] bg-linear-to-br from-emerald-900 via-primary to-emerald-800 ">
      <div className="absolute inset-0">
        <Image
          src="/images/who-we-server.jpg"
          alt={t("image-alt")}
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      <div className="relative mx-auto flex h-full max-w-5xl items-center justify-center px-6 py-20 text-center text-white">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            >
              <span className="bg-linear-to-r from-emerald-300 to-white bg-clip-text text-transparent">
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
              {t("description")}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhoWeServeHero;
