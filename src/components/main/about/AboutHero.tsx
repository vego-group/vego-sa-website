"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";

export default function AboutHero() {
  const t = useTranslations("about.hero");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const scrollToJourney = () => {
    const journeySection = document.getElementById("journey-section");
    if (journeySection) {
      journeySection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative h-[70vh] overflow-hidden bg-linear-to-br from-emerald-900 via-primary to-emerald-800">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/about-hero.jpg"
          className="h-full w-full object-cover opacity-25"
        >
          <source src="/images/time-lapse-traffic-4k.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay (same as ProductsHero) */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
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
          {t("subtitle")}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <button
            onClick={scrollToJourney}
            className="rounded-full bg-secondary px-8 py-3 font-medium uppercase tracking-wide text-white transition hover:bg-secondary/90"
          >
            {t("badge") || "قصتنا"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
