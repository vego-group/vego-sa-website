export type HeroStat = {
  value: string;
  label: string;
};

export type HeroAction = {
  label: string;
  target: string;
};

export type HeroContent = {
  image: {
    src: string;
    alt: string;
  };
  badge: string;
  title: string;
  description: string;
  actions: {
    primary: HeroAction;
    secondary: HeroAction;
  };
  stats: HeroStat[];
};

export type PreOrderImage = {
  src: string;
  alt: string;
  variant: "wide" | "large" | "small";
};

export type PreOrderContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  images: PreOrderImage[];
};

export type BrandVisionTitlePart = {
  text: string;
  tone?: "muted" | "accent";
};

export type BrandVisionStat = {
  number: string;
  value: string;
  label: string;
  description: string;
};

export type BrandVisionContent = {
  eyebrow: string;
  title: BrandVisionTitlePart[];
  description: string;
  stats: BrandVisionStat[];
};

export type CollectionTitlePart = {
  text: string;
  tone?: "muted" | "accent" | "brand";
};

export type CollectionProduct = {
  id: string;
  name: string;
  image: {
    src: string;
    alt: string;
  };
  fullPriceLabel: string;
  fullPrice: string;
  depositLabel: string;
  depositPrice: string;
  cta: {
    label: string;
    target: string;
  };
};

export type CollectionContent = {
  eyebrow: string;
  title: CollectionTitlePart[];
  description: string;
  products: CollectionProduct[];
};

export type PreOrderBenefitTitlePart = {
  text: string;
  tone?: "muted" | "accent";
};

export type PreOrderBenefit = {
  id: string;
  icon: "zap" | "shield" | "flame" | "card";
  title: string;
  description: string;
};

export type PreOrderBenefitsContent = {
  eyebrow: string;
  title: PreOrderBenefitTitlePart[];
  description: string;
  benefits: PreOrderBenefit[];
};

export type PreOrderJourneyTitlePart = {
  text: string;
  tone?: "muted" | "accent";
};

export type PreOrderJourneyStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type PreOrderJourneyContent = {
  eyebrow: string;
  title: PreOrderJourneyTitlePart[];
  description: string;
  steps: PreOrderJourneyStep[];
};

export type ImmersiveTechnologyTitlePart = {
  text: string;
  tone?: "muted" | "accent";
};

export type ImmersiveTechnologyCallout = {
  id: string;
  label: string;
  value: string;
  side: "start" | "end";
  position: "upper" | "lower";
};

export type ImmersiveTechnologyContent = {
  eyebrow: string;
  title: ImmersiveTechnologyTitlePart[];
  description: string;
  image: {
    src: string;
    alt: string;
  };
  callouts: ImmersiveTechnologyCallout[];
};

export type MyVegoAppTitlePart = {
  text: string;
  tone?: "muted" | "accent" | "brand";
};

export type MyVegoStoreLink = {
  id: string;
  platform: "google-play" | "app-store";
  eyebrow: string;
  label: string;
  href: string;
};

export type MyVegoAppContent = {
  title: MyVegoAppTitlePart[];
  description: string;
  image: {
    src: string;
    alt: string;
  };
  stores: MyVegoStoreLink[];
};

export type OwnersTitlePart = {
  text: string;
  tone?: "muted" | "accent";
};

export type OwnerTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export type OwnersContent = {
  eyebrow: string;
  title: OwnersTitlePart[];
  testimonials: OwnerTestimonial[];
};
