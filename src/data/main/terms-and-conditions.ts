import type {
  TermsAndConditionsContent,
  TermsSectionBlock,
  TermsTranslation,
  TermsRawTranslation,
} from "@/types";

type BuildTermsContentParams = {
  t: TermsTranslation;
  tRaw: TermsRawTranslation;
};

export function buildTermsSections({
  t,
  tRaw,
}: BuildTermsContentParams): TermsSectionBlock[] {
  return [
    {
      key: "introduction",
      title: t("sections.introduction.title"),
      paragraphs: tRaw<string[]>("sections.introduction.paragraphs"),
      icon: "file-text",
      featured: true,
    },
    {
      key: "use-of-services",
      title: t("sections.use-of-services.title"),
      items: [
        {
          label: t("sections.use-of-services.items.eligibility.label"),
          description: t("sections.use-of-services.items.eligibility.description"),
        },
        {
          label: t("sections.use-of-services.items.license.label"),
          description: t("sections.use-of-services.items.license.description"),
        },
        {
          label: t("sections.use-of-services.items.prohibited.label"),
          description: t("sections.use-of-services.items.prohibited.description"),
        },
      ],
      bullets: tRaw<string[]>("sections.use-of-services.items.prohibited-list"),
      icon: "shield-check",
    },
    {
      key: "products-services",
      title: t("sections.products-services.title"),
      items: [
        {
          label: t("sections.products-services.items.vehicles.label"),
          description: t("sections.products-services.items.vehicles.description"),
        },
        {
          label: t("sections.products-services.items.smart-os.label"),
          description: t("sections.products-services.items.smart-os.description"),
        },
        {
          label: t("sections.products-services.items.sadiq-app.label"),
          description: t("sections.products-services.items.sadiq-app.description"),
        },
      ],
      icon: "file-text",
    },
    {
      key: "payment",
      title: t("sections.payment.title"),
      items: [
        {
          label: t("sections.payment.items.pricing.label"),
          description: t("sections.payment.items.pricing.description"),
        },
        {
          label: t("sections.payment.items.payment.label"),
          description: t("sections.payment.items.payment.description"),
        },
        {
          label: t("sections.payment.items.refunds.label"),
          description: t("sections.payment.items.refunds.description"),
        },
      ],
      icon: "landmark",
      featured: true,
    },
    {
      key: "warranties",
      title: t("sections.warranties.title"),
      items: [
        {
          label: t("sections.warranties.items.products.label"),
          description: t("sections.warranties.items.products.description"),
        },
        {
          label: t("sections.warranties.items.service.label"),
          description: t("sections.warranties.items.service.description"),
        },
      ],
      icon: "shield-check",
    },
    {
      key: "liability",
      title: t("sections.liability.title"),
      paragraphs: [t("sections.liability.description")],
      bullets: tRaw<string[]>("sections.liability.items"),
      icon: "alert-triangle",
    },
    {
      key: "intellectual-property",
      title: t("sections.intellectual-property.title"),
      paragraphs: [t("sections.intellectual-property.description")],
      icon: "file-text",
      featured: true,
    },
    {
      key: "third-party-links",
      title: t("sections.third-party-links.title"),
      paragraphs: [t("sections.third-party-links.description")],
      icon: "file-text",
    },
    {
      key: "termination",
      title: t("sections.termination.title"),
      paragraphs: [t("sections.termination.description")],
      icon: "alert-triangle",
    },
    {
      key: "governing-law",
      title: t("sections.governing-law.title"),
      paragraphs: [t("sections.governing-law.description")],
      icon: "landmark",
      featured: true,
    },
    {
      key: "changes",
      title: t("sections.changes.title"),
      paragraphs: [t("sections.changes.description")],
      icon: "file-text",
    },
  ];
}

export function buildTermsAndConditionsContent({
  t,
  tRaw,
}: BuildTermsContentParams): TermsAndConditionsContent {
  return {
    hero: {
      badge: "VEGO Group",
      title: t("hero.title"),
      description: t("hero.description"),
    },
    overview: {
      eyebrow: "VEGO Legal",
      title: t("hero.title"),
      description: t("hero.description"),
      highlights: [
        t("sections.use-of-services.title"),
        t("sections.payment.title"),
        t("sections.contact.title"),
      ],
    },
    sections: buildTermsSections({ t, tRaw }),
    contact: {
      title: t("sections.contact.title"),
      company: t("sections.contact.company"),
      description: t("sections.contact.description"),
      location: t("sections.contact.location"),
      email: t("sections.contact.email"),
      emailLabel: t("sections.contact.emailLabel"),
    },
  };
}
