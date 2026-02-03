"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactCards() {
  const t = useTranslations("contact.cards");

  // قائمة البطاقات
  const cards = [
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: t("phone.title"),
      value: t("phone.value"),
      link: "tel:920014486",
    },
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: t("email.title"),
      value: t("email.value"),
      link: "mailto:info@vego.sa",
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: t("hours.title"),
      value: t("hours.value"),
      link: null,
    },
  ];

  return (
    <section className="py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">{card.icon}</div>
              <h4 className="text-lg font-semibold text-slate-800">{card.title}</h4>
            </div>

            {card.link ? (
              <a
                href={card.link}
                className="text-base font-medium text-primary hover:text-emerald-600"
              >
                {card.value}
              </a>
            ) : (
              <p className="text-base text-slate-600">{card.value}</p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
