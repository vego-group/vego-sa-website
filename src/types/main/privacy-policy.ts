export type PrivacyPolicyItem = {
  label: string;
  description: string;
};

export type PrivacyPolicyTranslation = (key: string) => string;

export type PrivacyPolicyRawTranslation = <T>(key: string) => T;

export type PrivacyPolicySection = {
  id: string;
  title: string;
  description?: string;
  items?: PrivacyPolicyItem[];
  bullets?: string[];
};

export type PrivacyPolicyHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type PrivacyPolicyIntroContent = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
};

export type PrivacyPolicyContactContent = {
  title: string;
  description: string;
  company: string;
  location: string;
  email: string;
};

export type PrivacyPolicyContent = {
  hero: PrivacyPolicyHeroContent;
  intro: PrivacyPolicyIntroContent;
  sections: PrivacyPolicySection[];
  contact: PrivacyPolicyContactContent;
};
