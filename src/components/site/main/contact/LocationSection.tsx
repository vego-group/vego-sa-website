"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function LocationSection() {
  const t = useTranslations("contact.location");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

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
                <p>
                  <span className="font-medium text-slate-800">
                    {t("addressLabel")}
                  </span>{" "}
                  {t("address")}
                </p>

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

              <a
                href={t("directionsLink")}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                {t("directionsText")}
                <ArrowIcon
                  className={`h-4 w-4 transition-transform ${
                    isArabic
                      ? "group-hover:-translate-x-0.5"
                      : "group-hover:translate-x-0.5"
                  }`}
                />
              </a>
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
