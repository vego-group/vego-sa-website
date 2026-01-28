"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Clock } from "lucide-react";

const items = [
  {
    icon: <Phone className="h-5 w-5 text-primary" />,
    title: "رقم الهاتف",
    value: "920014486",
    link: "tel:920014486",
  },
  {
    icon: <Mail className="h-5 w-5 text-primary" />,
    title: "البريد الإلكتروني",
    value: "info@vego.sa",
    link: "mailto:info@vego.sa",
  },
  {
    icon: <Clock className="h-5 w-5 text-primary" />,
    title: "ساعات العمل",
    value: "الأحد – الخميس | 8:00 ص – 6:00 م",
  },
];

export default function ContactCards() {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary/15">
                {item.icon}
              </div>
              <h4 className="text-lg font-semibold text-slate-800">
                {item.title}
              </h4>
            </div>

            {item.link ? (
              <a
                href={item.link}
                className="text-base font-medium text-primary transition-colors hover:text-emerald-600"
              >
                {item.value}
              </a>
            ) : (
              <p className="text-base leading-relaxed text-slate-600">
                {item.value}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
