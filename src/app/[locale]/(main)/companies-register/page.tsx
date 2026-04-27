import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CompaniesRegisterForm } from "@/components/site/companies-register/companies-register-form";
import { CompaniesRegisterHero } from "@/components/site/companies-register/companies-register-hero";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "companiesRegister.meta",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function CompaniesRegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CompaniesRegisterHero />
      <section className="container mx-auto px-4 py-10 md:py-14">
        <CompaniesRegisterForm />
      </section>
    </main>
  );
}