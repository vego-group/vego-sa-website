import type {
  PrivacyPolicyContent,
  PrivacyPolicyRawTranslation,
  PrivacyPolicySection,
  PrivacyPolicyTranslation,
} from "@/types";

type BuildPrivacyPolicyContentParams = {
  t: PrivacyPolicyTranslation;
  tRaw: PrivacyPolicyRawTranslation;
};

export function buildPrivacyPolicySections({
  t,
  tRaw,
}: BuildPrivacyPolicyContentParams): PrivacyPolicySection[] {
  return [
    {
      id: "information-collected",
      title: t("sections.information-collected.title"),
      items: [
        {
          label: t("sections.information-collected.items.account.label"),
          description: t("sections.information-collected.items.account.description"),
        },
        {
          label: t("sections.information-collected.items.location.label"),
          description: t("sections.information-collected.items.location.description"),
        },
        {
          label: t("sections.information-collected.items.device.label"),
          description: t("sections.information-collected.items.device.description"),
        },
        {
          label: t("sections.information-collected.items.usage.label"),
          description: t("sections.information-collected.items.usage.description"),
        },
        {
          label: t("sections.information-collected.items.payment.label"),
          description: t("sections.information-collected.items.payment.description"),
        },
      ],
    },
    {
      id: "how-we-use-information",
      title: t("sections.how-we-use-information.title"),
      bullets: tRaw<string[]>("sections.how-we-use-information.bullets"),
    },
    {
      id: "third-parties",
      title: t("sections.third-parties.title"),
      description: t("sections.third-parties.description"),
      items: [
        {
          label: t("sections.third-parties.items.providers.label"),
          description: t("sections.third-parties.items.providers.description"),
        },
        {
          label: t("sections.third-parties.items.government.label"),
          description: t("sections.third-parties.items.government.description"),
        },
        {
          label: t("sections.third-parties.items.admins.label"),
          description: t("sections.third-parties.items.admins.description"),
        },
      ],
    },
    {
      id: "data-security",
      title: t("sections.data-security.title"),
      description: t("sections.data-security.description"),
      bullets: tRaw<string[]>("sections.data-security.bullets"),
    },
    {
      id: "cookies",
      title: t("sections.cookies.title"),
      description: t("sections.cookies.description"),
      bullets: tRaw<string[]>("sections.cookies.bullets"),
    },
    {
      id: "your-rights",
      title: t("sections.your-rights.title"),
      description: t("sections.your-rights.description"),
      bullets: tRaw<string[]>("sections.your-rights.bullets"),
    },
    {
      id: "retention",
      title: t("sections.retention.title"),
      description: t("sections.retention.description"),
    },
    {
      id: "children-privacy",
      title: t("sections.children-privacy.title"),
      description: t("sections.children-privacy.description"),
    },
    {
      id: "policy-updates",
      title: t("sections.policy-updates.title"),
      description: t("sections.policy-updates.description"),
    },
  ];
}

export function buildPrivacyPolicyContent({
  t,
  tRaw,
}: BuildPrivacyPolicyContentParams): PrivacyPolicyContent {
  return {
    hero: {
      eyebrow: t("hero.eyebrow"),
      title: t("hero.title"),
      description: t("hero.description"),
    },
    intro: {
      eyebrow: t("intro.eyebrow"),
      title: t("intro.title"),
      description: t("intro.description"),
      highlights: tRaw<string[]>("intro.highlights"),
    },
    sections: buildPrivacyPolicySections({ t, tRaw }),
    contact: {
      title: t("contact.title"),
      description: t("contact.description"),
      company: t("contact.company"),
      location: t("contact.location"),
      email: t("contact.email"),
    },
  };
}
