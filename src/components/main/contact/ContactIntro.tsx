"use client";

import { motion } from "framer-motion";

export default function ContactIntro() {
  return (
    <section>
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl relative"
        >
          تواصل معنا بثقة
          </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
        >
          نحن هنا لدعمك وتقديم <span className="text-primary font-medium">الحلول الذكية</span> التي تواكب مستقبل التنقّل والتقنية.
        </motion.p>

        {/* Extra spacing before next item */}
        <div className="mt-12" /> {/* adjusts space to the item below */}
      </div>
    </section>
  );
}
