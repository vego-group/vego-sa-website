import { motion } from "framer-motion";
import { Landmark, Mail } from "lucide-react";
import { sectionVariants } from "@/data";
import type { PrivacyPolicyContactContent } from "@/types";

type PrivacyPolicyContactProps = {
  contact: PrivacyPolicyContactContent;
};

export default function PrivacyPolicyContact({
  contact,
}: PrivacyPolicyContactProps) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-900 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.22)] md:p-10"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-emerald-600">
            {contact.title}
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {contact.company}
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            {contact.description}
          </p>
        </div>

        <div className="grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-3">
            <Landmark className="h-5 w-5 text-emerald-600" />
            <span className="text-base text-slate-700">{contact.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-emerald-600" />
            <a
              href={`mailto:${contact.email}`}
              className="text-base font-medium text-slate-800 transition hover:text-emerald-600"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
