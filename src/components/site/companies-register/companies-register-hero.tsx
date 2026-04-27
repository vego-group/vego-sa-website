"use client";

import { useTranslations } from "next-intl";

export const CompaniesRegisterHero = () => {
  const t = useTranslations("companiesRegister");

  return (
    <section className="bg-gradient-to-br from-primary/10 via-white to-primary/5 py-12 md:py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
          {t("hero.title")}
        </h1>
        <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
          {t("hero.subtitle")}
        </p>
      </div>
    </section>
  );
};