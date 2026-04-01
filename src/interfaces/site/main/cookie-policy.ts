import {
  CookieConsentStatus,
  CookiePolicySectionTone,
} from "@/types/main/cookie-policy";

export interface CookiesPolicyHeroContent {
  eyebrow: string;
  title: string;
  description: string;
}
export type CookiePolicyHeroContent = CookiesPolicyHeroContent;

export interface CookiesPolicyIntroContent {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
}
export type CookiePolicyIntroContent = CookiesPolicyIntroContent;

export interface CookiesPolicySectionItem {
  label: string;
  description: string;
}
export type CookiePolicySectionItem = CookiesPolicySectionItem;

export interface CookiesPolicySection {
  id: string;
  title: string;
  description?: string;
  items?: CookiesPolicySectionItem[];
  bullets?: string[];
  tone?: CookiePolicySectionTone;
  featured?: boolean;
}
export type CookiePolicySection = CookiesPolicySection;

export interface CookiesPolicyContactContent {
  title: string;
  description: string;
  company: string;
  location: string;
  emailLabel: string;
  email: string;
}
export type CookiePolicyContactContent = CookiesPolicyContactContent;

export interface CookiePolicyBannerContent {
  title: string;
  description: string;
  acceptLabel: string;
  declineLabel: string;
  acceptedMessage: string;
  rejectedMessage: string;
}

export interface CookiePolicyContent {
  hero: CookiesPolicyHeroContent;
  intro: CookiesPolicyIntroContent;
  sections: CookiesPolicySection[];
  contact: CookiesPolicyContactContent;
  banner: CookiePolicyBannerContent;
}

export interface CookiePolicyProps {
  initialConsent: CookieConsentStatus | null;
}
