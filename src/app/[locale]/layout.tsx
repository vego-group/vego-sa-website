import type { Metadata } from "next";
import { Cairo, Cormorant_Garamond } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import Navbar from "@/components/navbar.tsx";
import CommitmentToExcellence from "@/components/CommitmentToExcellence";
import Footer from "@/components/Footer";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vego Group",
  description:
    "Vego Group - Saudi Arabia\'s first electric mobility company. Discover innovative electric motorcycles, bikes, and smart delivery solutions with cutting-edge technology and sustainability.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
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
    <html lang={locale} dir={dir}>
      <body className={`${cairo.variable} ${cormorant.variable} antialiased`}>
        <div className="min-h-screen">
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            {children}
            <CommitmentToExcellence />
            <Footer />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
