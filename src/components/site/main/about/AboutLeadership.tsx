"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Linkedin, Mail, Sparkles } from "lucide-react";
import { aboutLeadershipLeaders } from "@/data/main";

export default function AboutLeadership() {
  const t = useTranslations("about.leadership");

  return (
    <section className="relative overflow-hidden py-8">
      {/* Removed: Background Pattern */}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="mb-20 text-center">
          {/* Badge */}
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-6 py-2 text-sm font-semibold uppercase tracking-wider text-secondary backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4" />
            {t("badge")}
          </motion.span>

          {/* Title */}
          <motion.h2
            className="mt-8 font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-linear-to-r from-primary via-secondary to-emerald-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="mx-auto mt-6 max-w-3xl text-lg font-light leading-relaxed text-slate-700 sm:text-xl"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t("description")}
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mt-12 h-1 max-w-md rounded-full bg-linear-to-r from-transparent via-secondary/50 to-transparent"
          />
        </div>

        {/* Leadership Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {aboutLeadershipLeaders.map((leader, index) => (
            <motion.div
              key={leader.key}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Card Container */}
              <div className="relative h-full overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-secondary/20 group-hover:-translate-y-2">
                {/* Image Section */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={t(`items.${leader.key}.name`)}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${leader.gradient} opacity-8`}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/22 via-primary/8 to-transparent" />

                  {/* Role Badge */}
                  <div className="absolute bottom-4 right-4">
                    <span className="rounded-full bg-linear-to-r from-secondary to-emerald-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                      {t(`items.${leader.key}.role`)}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 text-center">
                  {/* Name */}
                  <h3 className="text-xl font-bold text-primary">
                    {t(`items.${leader.key}.name`)}
                  </h3>

                  {/* Bio */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {t(`items.${leader.key}.bio`)}
                  </p>
                </div>

                {/* Accent Border */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${leader.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
