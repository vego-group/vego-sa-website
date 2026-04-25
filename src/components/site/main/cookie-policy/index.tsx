"use client";

import { useLocale } from "next-intl";
import { getCookiePolicyContent } from "@/data";
import CookiePolicyContact from "./CookiePolicyContact";
import CookiePolicyHero from "./CookiePolicyHero";
import CookiePolicyIntro from "./CookiePolicyIntro";
import CookiePolicySections from "./CookiePolicySections";

function CookiePolicy() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const content = getCookiePolicyContent(locale);

  return (
    <div className="bg-white" dir={isArabic ? "rtl" : "ltr"}>
      <CookiePolicyHero hero={content.hero} />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 md:gap-10 md:py-20 lg:gap-12 lg:py-24">
        <CookiePolicyIntro intro={content.intro} isArabic={isArabic} />
        <CookiePolicySections sections={content.sections} />
        <CookiePolicyContact contact={content.contact} />
      </div>
    </div>
  );
}

export default CookiePolicy;
