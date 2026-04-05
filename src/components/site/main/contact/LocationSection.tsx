"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function LocationSection() {
  const t = useTranslations("contact.location");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;
  const locations = ["hq", "showroom", "china"] as const;

  return (
    <section>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="grid md:grid-cols-2">
            {/* Left: Location Info */}
            <div
              className={`p-8 sm:p-10 ${isArabic ? "text-right" : "text-left"}`}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-primary">
                  {t("title")}
                </h3>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-slate-600">
                <div>
                  <span className="font-medium text-slate-800">
                    {t("addressLabel")}
                  </span>
                  <div className="mt-3 space-y-3">
                    {locations.map((location) => (
                      <a
                        key={location}
                        href={t(`locations.${location}.link`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 rounded-2xl border border-slate-200 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-slate-50"
                      >
                        <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <div className="space-y-1">
                          <p className="font-medium text-slate-800">
                            {t(`locations.${location}.title`)}
                          </p>
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover:text-emerald-600">
                            {t("directionsText")}
                            <ArrowIcon
                              className={`h-4 w-4 transition-transform ${
                                isArabic
                                  ? "group-hover:-translate-x-0.5"
                                  : "group-hover:translate-x-0.5"
                              }`}
                            />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <p>
                  <span className="font-medium text-slate-800">
                    {t("phoneLabel")}
                  </span>{" "}
                  <a
                    href={`tel:${t("phone")}`}
                    className="font-medium text-primary transition-colors hover:text-emerald-600"
                  >
                    {t("phone")}
                  </a>
                </p>

                <p>
                  <span className="font-medium text-slate-800">
                    {t("emailLabel")}
                  </span>{" "}
                  <a
                    href={`mailto:${t("email")}`}
                    className="font-medium text-primary transition-colors hover:text-emerald-600"
                  >
                    {t("email")}
                  </a>
                </p>
              </div>

            </div>

            {/* Right: Map */}
            <div className="relative h-80 md:h-full">
              <iframe
                src={t("mapSrc")}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
