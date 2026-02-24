"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjects = [
    t("subjects.general"),
    t("subjects.products"),
    t("subjects.partnership"),
    t("subjects.support"),
    t("subjects.jobs"),
  ];

  return (
    <section>
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          
          {/* Decorative gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent" />

          <div className="relative p-8 sm:p-6">
            {/* Header */}
            <div className="mb-10">
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-3 shadow-md">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-primary">
                  {t("title")}
                </h3>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-slate-600">
                {t("description")}
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Name & Email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder={t("name")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
                <input
                  type="email"
                  placeholder={t("email")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>

              {/* Phone & Subject */}
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  type="tel"
                  placeholder={t("phone")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary"
                />
                <select
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary"
                >
                  <option value="">{t("subjectPlaceholder")}</option>
                  {subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <textarea
                rows={5}
                placeholder={t("message")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner resize-none transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-4 w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-4 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
              >
                {t("submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
