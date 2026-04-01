"use client";

import { motion } from "framer-motion";
import { Landmark, Mail } from "lucide-react";
import { sectionVariants } from "@/data";
import { CookiePolicyContactContent } from "@/interfaces/site/main/cookie-policy";

type CookiePolicyContactProps = {
  contact: CookiePolicyContactContent;
};

export default function CookiePolicyContact({
  contact,
}: CookiePolicyContactProps) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="overflow-hidden rounded-[2rem] border border-primary/10 bg-white p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.22)] md:p-10"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-secondary uppercase">
            {contact.title}
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {contact.company}
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-8 text-primary/80">
            {contact.description}
          </p>
        </div>

        <div className="grid gap-4 rounded-[1.75rem] border border-secondary/15 bg-secondary/8 p-6">
          <div className="flex items-center gap-3">
            <Landmark className="h-5 w-5 text-secondary" />
            <span className="text-base text-primary">{contact.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-secondary" />
            <a
              href={`mailto:${contact.email}`}
              className="text-base font-medium text-primary transition hover:text-secondary"
            >
              {contact.emailLabel}: {contact.email}
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
