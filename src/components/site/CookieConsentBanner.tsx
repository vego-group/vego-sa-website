"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { CookiePolicyBannerContent } from "@/interfaces/site/main/cookie-policy";
import type { CookieConsentStatus } from "@/types/main/cookie-policy";
import {
  acceptCookieConsent,
  rejectCookieConsent,
} from "@/lib/utils/cookie-policy";

type CookieConsentBannerProps = {
  banner: CookiePolicyBannerContent;
  initialConsent: CookieConsentStatus | null;
  isArabic: boolean;
};

export default function CookieConsentBanner({
  banner,
  initialConsent,
  isArabic,
}: CookieConsentBannerProps) {
  const [consent, setConsent] = useState<CookieConsentStatus | null>(
    initialConsent,
  );
  const [isPending, startTransition] = useTransition();

  const handleConsent = (nextConsent: CookieConsentStatus) => {
    startTransition(() => {
      void (async () => {
        if (nextConsent === "accepted") {
          await acceptCookieConsent();
        } else {
          await rejectCookieConsent();
        }

        setConsent(nextConsent);
      })();
    });
  };

  if (consent) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-x-0 bottom-4 z-[70] px-4"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-secondary/15 bg-white/95 p-5 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] backdrop-blur md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-primary md:text-2xl">
                {banner.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-primary/80 md:text-base">
                {banner.description}
              </p>
              <Link
                href="/cookie-policy"
                className="mt-3 inline-flex text-sm font-semibold text-secondary transition hover:text-primary"
              >
                {isArabic
                  ? "قراءة سياسة ملفات تعريف الارتباط"
                  : "Read cookie policy"}
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleConsent("accepted")}
                disabled={isPending}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {banner.acceptLabel}
              </button>
              <button
                type="button"
                onClick={() => handleConsent("rejected")}
                disabled={isPending}
                className="rounded-full border border-secondary bg-white px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary/8 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {banner.declineLabel}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
