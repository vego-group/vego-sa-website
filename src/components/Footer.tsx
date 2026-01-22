"use client";

import Image from "next/image";
import { Mail, MapPin, Phone, Zap } from "lucide-react";
import { footerLinks, socialLinks } from "@/data/main/footer";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

function Footer() {
  const t = useTranslations("footer");
  const handleScrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="bg-green-100/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="space-y-6">
            <Button
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
            </Button>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              {t("description")}
            </p>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-500" />
                <span dir="ltr">+966 11 234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-500" />
                <span className="ltr">info@vegogroup.com</span>
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
                <h3 className="text-base font-semibold text-slate-900">
                  {t(group.title)}
                </h3>
                <ul className="space-y-2 text-slate-600">
                  {group.links.map((link) => (
                    <li key={link}>
                      <Button
                        type="button"
                        className="transition hover:text-slate-900"
                      >
                        {t(link)}
                      </Button>
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
                <Button
                  key={social.label}
                  type="button"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:text-slate-900"
                >
                  <Icon className="h-5 w-5" />
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/70 pt-8 text-sm text-slate-500">
          <span>{t("rights-reserved")}</span>
          <div className="flex items-center gap-2 text-slate-700">
            <Zap className="h-4 w-4 text-slate-800" />
            <span>{t("electric")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
