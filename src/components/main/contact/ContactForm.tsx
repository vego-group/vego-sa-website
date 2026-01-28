"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjects = [
    "استفسار عام",
    "معلومات عن المنتجات",
    "فرص الشراكة",
    "الدعم الفني",
    "فرص العمل",
  ];

  return (
    <section>
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          
          {/* Decorative gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent" />

          <div className="relative p-8 sm:p-10">
            {/* Header */}
            <div className="mb-10">
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-3 shadow-md">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-primary">
                  أرسل لنا رسالة
                </h3>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-slate-600">
                املأ النموذج وسيتواصل فريقنا معك في أقرب وقت.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  placeholder="الاسم الكامل"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  placeholder="رقم الهاتف"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary"
                />
                <select
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary"
                >
                  <option value="">اختر الموضوع</option>
                  {subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <textarea
                rows={5}
                placeholder="اكتب رسالتك هنا..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner resize-none transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />

              <button
                disabled={isSubmitting}
                className="group mt-4 w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-4 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
              >
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
