import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LOGO, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/constants";
import CommitmentToExcellence from "@/components/site/CommitmentToExcellence";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/navbar.tsx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === "ar" ? "ar_AR" : "en_US";
  const alternateLocale = locale === "ar" ? "en_US" : "ar_AR";

  return {
    metadataBase: new URL(SITE_URL),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // icons: {
    //   icon: LOGO,
    // },
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_TITLE,
      images: [
        {
          url: LOGO,
          width: 1200,
          height: 630,
          alt: SITE_TITLE,
        },
      ],
      locale: ogLocale,
      alternateLocale: [alternateLocale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [LOGO],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div lang={locale} dir={dir} className="min-h-svh">
      <NextIntlClientProvider messages={messages}>
        <Navbar />
        <main>{children}</main>
        <CommitmentToExcellence />
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
