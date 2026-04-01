"use server";

import { CookieConsentStatus } from "@/types/main/cookie-policy";
import { cookies } from "next/headers";

const COOKIE_CONSENT_KEY = "cookie_consent";

export const getCookieConsent =
  async (): Promise<CookieConsentStatus | null> => {
    const cookieStore = await cookies();
    const consent = cookieStore.get(COOKIE_CONSENT_KEY)?.value;

    if (consent === "accepted" || consent === "rejected") {
      return consent;
    }

    return null;
  };

export const setCookieConsent = async (value: CookieConsentStatus) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_CONSENT_KEY,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
};

export const removeCookieConsent = async () => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_CONSENT_KEY,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
};

export const acceptCookieConsent = async () => {
  await setCookieConsent("accepted");
};

export const rejectCookieConsent = async () => {
  await setCookieConsent("rejected");
};
