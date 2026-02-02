"use client";

import { motion } from "framer-motion";
import { sectionVariants } from "@/data";
import { Sparkles, Target, Leaf, Battery, Crown } from "lucide-react";
import { useTranslations } from "next-intl";

function AboutSustainability() {
  const t = useTranslations("about.sustainability");

  const solutions = [
    {
      icon: <Sparkles className="h-12 w-12" />,
      titleKey: "solutions.electricBikes.title",
      descKey: "solutions.electricBikes.description",
      delay: 0.1,
    },
    {
      icon: <Target className="h-12 w-12" />,
      titleKey: "solutions.deliverySolutions.title",
      descKey: "solutions.deliverySolutions.description",
      delay: 0.2,
    },
    {
      icon: <Leaf className="h-12 w-12" />,
      titleKey: "solutions.micromobility.title",
      descKey: "solutions.micromobility.description",
      delay: 0.3,
    },
    {
      icon: <Battery className="h-12 w-12" />,
      titleKey: "solutions.chargingSystems.title",
      descKey: "solutions.chargingSystems.description",
      delay: 0.4,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-white to-emerald-100">
      {/* Enhanced Decorative Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient wash */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-100/40 via-white to-[#0d163f]/5" />

        {/* Animated glow blobs */}
        <motion.div
          className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-[#1bd989]/20 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[25%] -right-[10%] h-[500px] w-[500px] rounded-full bg-[#0d163f]/15 blur-[140px]"
          animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(circle at 50% 40%, black 45%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 40%, black 45%, transparent 75%)",
          }}
        />

        {/* Floating rings */}
        <motion.div
          className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full border border-[#1bd989]/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full border border-[#0d163f]/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        className="relative mx-auto max-w-7xl px-6 py-32"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-8 inline-flex"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
          >
            <Crown className="h-16 w-16 text-[#1bd989]/20" />
          </motion.div>

          <motion.h2
            className="text-6xl font-bold bg-gradient-to-r from-[#0d163f] via-[#0d163f] to-[#1bd989] bg-clip-text text-transparent sm:text-7xl font-arabic tracking-tight pb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("title")}
          </motion.h2>

          <motion.p
            className="mx-auto mt-8 max-w-3xl text-2xl font-light leading-relaxed text-[#0d163f] font-arabic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {solutions.map((sol, idx) => (
            <motion.div
              key={idx}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: sol.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] group-hover:shadow-[0_40px_80px_-20px_rgba(27,217,137,0.15)] transition-all duration-500" />

                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#1bd989]/10 via-transparent to-transparent blur-xl" />
                </div>

                <div className="relative p-12">
                  <div className="mx-auto mb-10 flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)]">
                    {sol.icon}
                  </div>

                  <h3 className="mb-8 text-center text-3xl font-bold text-[#1bd989] font-arabic">
                    {t(sol.titleKey)}
                  </h3>

                  <p className="px-4 text-center text-lg font-light leading-relaxed text-[#0d163f]/90 font-arabic">
                    {t(sol.descKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Arabic Font */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap");
        .font-arabic {
          font-family: "Noto Sans Arabic", sans-serif;
        }
      `}</style>
    </section>
  );
}

export default AboutSustainability;
