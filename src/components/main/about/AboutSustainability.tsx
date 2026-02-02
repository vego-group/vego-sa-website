"use client";

import { motion } from "framer-motion";
import { sectionVariants } from "@/data";
import { Sparkles, Target, Leaf, Battery, Crown } from "lucide-react";
import { useTranslations } from "next-intl";

function AboutSustainability() {
  const t = useTranslations("about.sustainability");

  // Solutions data with translation keys
  const solutions = [
    { icon: <Sparkles className="h-12 w-12" />, titleKey: "solutions.electricBikes.title", descKey: "solutions.electricBikes.description", delay: 0.1 },
    { icon: <Target className="h-12 w-12" />, titleKey: "solutions.deliverySolutions.title", descKey: "solutions.deliverySolutions.description", delay: 0.2 },
    { icon: <Leaf className="h-12 w-12" />, titleKey: "solutions.micromobility.title", descKey: "solutions.micromobility.description", delay: 0.3 },
    { icon: <Battery className="h-12 w-12" />, titleKey: "solutions.chargingSystems.title", descKey: "solutions.chargingSystems.description", delay: 0.4 },
  ];

  return (
    <section className="relative bg-white">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(250, 250, 250) 1px, transparent 1px),
                             linear-gradient(to bottom, rgb(250, 250, 250) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 70%)",
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-[#1bd989]/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-[#0d163f]/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
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
        <motion.div className="text-center mb-24" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
          <motion.div className="inline-flex mb-8" initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ duration: 0.6, type: "spring" }} viewport={{ once: true }}>
            <Crown className="h-16 w-16 text-[#1bd989]/20" />
          </motion.div>

          <motion.h2
            className="text-6xl font-bold bg-gradient-to-r from-[#0d163f] via-[#0d163f] to-[#1bd989] bg-clip-text text-transparent sm:text-7xl font-arabic tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("title")}
          </motion.h2>

          <motion.p className="mt-8 text-2xl text-[#0d163f] leading-relaxed font-light font-arabic max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}>
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {solutions.map((sol, idx) => (
            <motion.div key={idx} className="group relative" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: sol.delay, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, margin: "-100px" }} whileHover={{ y: -8 }}>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] group-hover:shadow-[0_40px_80px_-20px_rgba(27,217,137,0.15)] transition-all duration-500" />
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#1bd989]/10 via-transparent to-transparent rounded-3xl blur-xl" />
                </div>

                <div className="relative p-12">
                  <div className="relative mx-auto mb-10 flex h-28 w-28 items-center justify-center rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)] transition-all duration-500 border-2 border-white/50">
                    {sol.icon}
                  </div>

                  <h3 className="text-center text-3xl font-bold mb-8 text-[#1bd989] font-arabic">{t(sol.titleKey)}</h3>
                  <p className="text-center text-lg text-[#0d163f]/90 leading-relaxed font-light px-4 font-arabic">{t(sol.descKey)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Arabic font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');
        .font-arabic {
          font-family: 'Noto Sans Arabic', sans-serif;
        }
      `}</style>
    </section>
  );
}

export default AboutSustainability;
