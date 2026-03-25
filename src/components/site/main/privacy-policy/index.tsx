"use client";

import { useLocale, useTranslations } from "next-intl";
import { buildPrivacyPolicyContent } from "@/data";
import PrivacyPolicyContact from "./PrivacyPolicyContact";
import PrivacyPolicyHero from "./PrivacyPolicyHero";
import PrivacyPolicyIntro from "./PrivacyPolicyIntro";
import PrivacyPolicySections from "./PrivacyPolicySections";

export default function PrivacyPolicy() {
  const t = useTranslations("privacy-policy");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const content = buildPrivacyPolicyContent({
    t,
    tRaw: t.raw,
  });

  return (
    <div className="bg-white" dir={isArabic ? "rtl" : "ltr"}>
      <PrivacyPolicyHero hero={content.hero} />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 md:gap-10 md:py-20 lg:gap-12 lg:py-24">
        <PrivacyPolicyIntro intro={content.intro} isArabic={isArabic} />
        <PrivacyPolicySections sections={content.sections} />
        <PrivacyPolicyContact contact={content.contact} />
      </div>
    </div>
  );
}
