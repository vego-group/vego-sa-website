"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Zap } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { landingFooterContent } from "@/data/landing/footer";
import type { LandingFooterProps } from "@/types/landing/footer";

function Footer({ content = landingFooterContent }: LandingFooterProps) {
  const handleScrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Link
        href={content.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={content.whatsapp.ariaLabel}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,0.8)] transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
      >
        <FaWhatsapp className="h-7 w-7" />
      </Link>

      <footer className="relative overflow-hidden bg-[#00091f]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,123,181,0.24),transparent_32%),radial-gradient(circle_at_82%_28%,rgba(0,214,111,0.14),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(16,20,75,0.7),transparent_42%),linear-gradient(135deg,#00111f_0%,#00051c_48%,#03001f_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-secondary/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white/6 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/35 to-transparent" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
            <div className="space-y-6">
              <button
                type="button"
                aria-label={content.scrollTopAriaLabel}
                onClick={handleScrollToTop}
                className="cursor-pointer"
              >
                <Image
                  src={content.logo.src}
                  alt={content.logo.alt}
                  width={90}
                  height={90}
                />
              </button>

              <p className="max-w-md text-sm leading-relaxed text-white/70">
                {content.description}
              </p>

              <div className="space-y-3 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-white/55" />
                  <Link
                    href={content.contact.phone.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="hover:underline"
                  >
                    {content.contact.phone.label}
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-white/55" />
                  <Link
                    href={content.contact.email.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="hover:underline"
                  >
                    {content.contact.email.label}
                  </Link>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
                  <div className="space-y-2">
                    {content.contact.locations.map((location) => (
                      <Link
                        key={location.id}
                        href={location.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block leading-relaxed hover:underline"
                      >
                        {location.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {content.linkGroups.map((group) => (
                <div key={group.title} className="space-y-4 text-sm">
                  <h3 className="text-base font-semibold text-secondary">
                    {group.title}
                  </h3>
                  <ul className="space-y-2 text-white/70">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-start transition hover:text-secondary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/15 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {content.socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={social.label}
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white shadow-sm shadow-black/10 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white hover:text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-8 text-sm text-white/60">
            <span>{content.rightsReserved}</span>
            <div className="flex items-center gap-2 text-white/80">
              <Zap className="size-4 text-secondary" />
              <span>{content.electric}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
