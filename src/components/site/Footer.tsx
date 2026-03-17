"use client";

import Image from "next/image";
import { Mail, MapPin, Phone, Zap } from "lucide-react";
import { footerLinks, socialLinks } from "@/data/footer";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("footer");
  const handleScrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Link
        href="https://wa.me/966579820538"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className={`fixed bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,0.8)] transition hover:-translate-y-1 hover:bg-[#1ebe5d] ${
          isArabic ? "left-6" : "right-6"
        }`}
      >
        <FaWhatsapp className="h-7 w-7" />
      </Link>

      <footer className="bg-secondary/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
            <div className="space-y-6">
              <button
                type="button"
                aria-label="Scroll to top"
                onClick={handleScrollToTop}
                className="cursor-pointer"
              >
                <Image
                  src="/images/logo.svg"
                  alt="VEGO logo"
                  width={90}
                  height={90}
                />
              </button>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">
                {t("description")}
              </p>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <Link
                    href="tel:+966538241507"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="hover:underline"
                  >
                    +966 53 824 1507
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <Link
                    href="mailto:info@vego.sa"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="hover:underline"
                  >
                    info@vego.sa
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span>{t("location")}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {footerLinks.map((group) => (
                <div key={group.title} className="space-y-4 text-sm">
                  <h3 className="text-base font-semibold text-primary">
                    {t(group.title)}
                  </h3>
                  <ul className="space-y-2 text-slate-600">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="transition hover:text-primary text-start"
                        >
                          {t(link.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200/70 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/70 pt-8 text-sm text-slate-500">
            <span>{t("rights-reserved")}</span>
            <div className="flex items-center gap-2 text-slate-700">
              <Zap className="size-4 text-slate-800" />
              <span>{t("electric")}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
