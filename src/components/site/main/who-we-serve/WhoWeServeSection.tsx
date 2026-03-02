"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  heroContainerVariants,
  listItemVariants,
  sectionVariants,
  whoWeServeSections,
} from "@/data";

function WhoWeServeSection() {
  const t = useTranslations("who-we-serve");
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-6">
        {whoWeServeSections.map((section) => (
          <div
            key={section.key}
            className={`grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] ${
              section.flip ? "lg:grid-cols-[1fr_1.1fr]" : ""
            }`}
          >
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className={`relative ${section.flip ? "lg:order-2" : ""}`}
            >
              <div className="group relative overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                <Image
                  src={section.image}
                  alt={t(`sections.${section.key}.image-alt`)}
                  width={720}
                  height={520}
                  className="h-75 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div
                className={`absolute -bottom-8 ${
                  section.flip ? "left-10" : "right-10"
                } hidden rounded-2xl bg-white px-6 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.18)] md:flex md:items-center md:gap-4`}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-secondary">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                  >
                    <path
                      d="M4 13V8.8c0-1 .8-1.8 1.8-1.8h7.4c.9 0 1.8.7 1.8 1.7V13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 16.5h12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 16.5V19m8-2.5V19"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-base font-semibold text-primary">
                  {t(`sections.${section.key}.title`)}
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className={`${section.flip ? "lg:order-1" : ""}`}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-secondary shadow-sm">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                  >
                    <path
                      d="M6 6h12v12H6z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 9h6v6H9z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
                {t("sections.badge")}
              </div>

              <h3 className="mt-6 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                {t(`sections.${section.key}.title`)}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                {t(`sections.${section.key}.description`)}
              </p>

              <motion.ul
                variants={heroContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="mt-8 grid gap-4 sm:grid-cols-2"
              >
                {section.bulletKeys.map((bulletKey) => (
                  <motion.li
                    key={bulletKey}
                    variants={listItemVariants}
                    className="flex items-center gap-3 text-sm font-semibold text-primary sm:text-base"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-white">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                      >
                        <path
                          d="M9 12h6m0 0l-2.5-2.5M15 12l-2.5 2.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {t(`sections.${section.key}.bullets.${bulletKey}`)}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhoWeServeSection;
