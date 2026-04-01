"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { CookiePolicyBannerContent } from "@/interfaces/site/main/cookie-policy";
import {
  acceptCookieConsent,
  rejectCookieConsent,
} from "@/lib/utils/cookie-policy";
import { CookieConsentStatus } from "@/types/main/cookie-policy";

type CookiePolicyConsentProps = {
  banner: CookiePolicyBannerContent;
  initialConsent: CookieConsentStatus | null;
};

export default function CookiePolicyConsent({
  banner,
  initialConsent,
}: CookiePolicyConsentProps) {
  const [consent, setConsent] = useState<CookieConsentStatus | null>(
    initialConsent,
  );
  const [isPending, startTransition] = useTransition();

  const persistConsent = async (nextConsent: CookieConsentStatus) => {
    if (nextConsent === "accepted") {
      await acceptCookieConsent();
    } else {
      await rejectCookieConsent();
    }

    setConsent(nextConsent);
  };

  const handleConsent = (nextConsent: CookieConsentStatus) => {
    startTransition(() => {
      void persistConsent(nextConsent);
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      className="rounded-[2rem] border border-secondary/15 bg-secondary/8 p-6 shadow-sm"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-primary">{banner.title}</h2>
          <p className="mt-3 text-base leading-8 text-primary/80">
            {banner.description}
          </p>
          {consent ? (
            <p className="mt-4 text-sm font-medium text-secondary">
              {consent === "accepted"
                ? banner.acceptedMessage
                : banner.rejectedMessage}
            </p>
          ) : null}
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
    </motion.section>
  );
}
