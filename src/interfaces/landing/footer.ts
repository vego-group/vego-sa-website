import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons/lib";

export interface LandingFooterLink {
  label: string;
  href: string;
}

export interface LandingFooterLinkGroup {
  title: string;
  links: LandingFooterLink[];
}

export interface LandingFooterLocation {
  id: string;
  label: string;
  href: string;
}

export interface LandingFooterSocialLink {
  label: string;
  href: string;
  icon: LucideIcon | IconType;
}

export interface LandingFooterContact {
  phone: {
    label: string;
    href: string;
  };
  email: {
    label: string;
    href: string;
  };
  locations: LandingFooterLocation[];
}

export interface LandingFooterContent {
  logo: {
    src: string;
    alt: string;
  };
  whatsapp: {
    href: string;
    ariaLabel: string;
  };
  scrollTopAriaLabel: string;
  description: string;
  contact: LandingFooterContact;
  linkGroups: LandingFooterLinkGroup[];
  socialLinks: LandingFooterSocialLink[];
  rightsReserved: string;
  electric: string;
}
