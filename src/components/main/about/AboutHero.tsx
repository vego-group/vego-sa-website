"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
        block: "start"
      });
    }
  };

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-105"
        poster="/images/about-hero.jpg"
      >
        <source src="/images/time-lapse-traffic-4k.mp4" type="video/mp4" />
      </video>

      {/* Strong Overlay */}
      <div className="absolute inset-0 z-10 bg-black/70" />

      {/* Main Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
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

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* قصتنا Button - Scrolls to Journey section */}
          <button 
            onClick={scrollToJourney}
            className="rounded-full bg-secondary px-8 py-3 text-white font-medium uppercase tracking-wide hover:bg-secondary/90 transition"
          >
            {t("badge") || "قصتنا"}  {/* Fallback to "قصتنا" if translation not available */}
          </button>
          
          {/* Optional additional button if needed */}
          {/* <button className="rounded-full border-2 border-white px-8 py-3 text-white font-medium uppercase tracking-wide hover:bg-white/10 transition">
            تعرف أكثر
          </button> */}
        </motion.div>
      </div>
    </section>
  );
}