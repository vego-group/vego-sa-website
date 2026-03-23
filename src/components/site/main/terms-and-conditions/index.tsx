"use client";

import { useLocale, useTranslations } from "next-intl";
import { buildTermsAndConditionsContent } from "@/data";
import TermsContactSection from "./TermsContactSection";
import TermsHero from "./TermsHero";
import TermsOverview from "./TermsOverview";
import TermsSectionsGrid from "./TermsSectionsGrid";

function TermsAndConditions() {
  const t = useTranslations("terms-and-conditions");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const content = buildTermsAndConditionsContent({
    t,
    tRaw: t.raw,
  });

  return (
    <div className="bg-white">
      <TermsHero hero={content.hero} />

      <div
        className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:py-24"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <TermsOverview overview={content.overview} isArabic={isArabic} />
        <TermsSectionsGrid sections={content.sections} />
        <TermsContactSection contact={content.contact} />
      </div>
    </div>
  );
}

export default TermsAndConditions;
