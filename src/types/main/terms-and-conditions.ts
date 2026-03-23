export type TermsIconName =
  | "shield-check"
  | "file-text"
  | "alert-triangle"
  | "landmark";

export type TermsTranslation = (key: string) => string;

export type TermsRawTranslation = <T>(key: string) => T;

export type TermsDetailItem = {
  label: string;
  description: string;
};

export type TermsSectionBlock = {
  key: string;
  title: string;
  paragraphs?: string[];
  items?: TermsDetailItem[];
  bullets?: string[];
  icon: TermsIconName;
  featured?: boolean;
};

export type TermsHeroContent = {
  badge: string;
  title: string;
  description: string;
};

export type TermsOverviewContent = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
};

export type TermsContactContent = {
  title: string;
  company: string;
  description: string;
  location: string;
  email: string;
  emailLabel: string;
};

export type TermsAndConditionsContent = {
  hero: TermsHeroContent;
  overview: TermsOverviewContent;
  sections: TermsSectionBlock[];
  contact: TermsContactContent;
};
