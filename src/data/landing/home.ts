import type {
  BrandVisionContent,
  CollectionContent,
  HeroContent,
  ImmersiveTechnologyContent,
  MyVegoAppContent,
  OwnersContent,
  PreOrderBenefitsContent,
  PreOrderContent,
  PreOrderJourneyContent,
} from "@/types/landing/home";

export const landingHero: HeroContent = {
  image: {
    src: "/images/landing/hero-section.jpg",
    alt: "دراجة فيجو الكهربائية",
  },
  badge: "مستقبل التنقل الكهربائي يبدأ من هنا",
  title: "حلول تنقل كهربائية ذكية تقود أعمالك للمستقبل",
  description:
    "فيجو تقدم منظومة متكاملة من الدراجات الكهربائية، حلول التوصيل، وإدارة التشغيل الذكية لتقليل التكلفة ورفع كفاءة الحركة اليومية.",
  actions: {
    primary: {
      label: "احجز الآن",
      target: "contact",
    },
    secondary: {
      label: "استكشف المنتجات",
      target: "products",
    },
  },
  stats: [
    { value: "100%", label: "كهربائي" },
    {
      value: "24/7",
      label: "تشغيل ذكي",
    },
    {
      value: "+30%",
      label: "توفير تشغيلي",
    },
  ],
};

export const landingCollection: CollectionContent = {
  eyebrow: "03 - THE COLLECTION",
  title: [
    { text: "لماذا الحجز", tone: "muted" },
    { text: "المسبق", tone: "accent" },
    { text: "لدبابات", tone: "muted" },
    { text: "MY VEGO", tone: "brand" },
  ],
  description:
    "اختر دراجتك الكهربائية من مجموعة متنوعة من الدراجات الكهربائية المصممة للمستقبل",
  products: [
    {
      id: "vego-2030-01",
      name: "VEGO 2030",
      image: {
        src: "/images/landing/vego2030.png",
        alt: "دراجة VEGO 2030 الكهربائية",
      },
      fullPriceLabel: "السعر الكامل:",
      fullPrice: "30,000 ريال",
      depositLabel: "العربون (10%):",
      depositPrice: "3,000 ريال",
      cta: {
        label: "احجز الآن",
        target: "contact",
      },
    },
    {
      id: "vego-2030-02",
      name: "VEGO 2030",
      image: {
        src: "/images/landing/vego2030.png",
        alt: "دراجة VEGO 2030 الكهربائية",
      },
      fullPriceLabel: "السعر الكامل:",
      fullPrice: "30,000 ريال",
      depositLabel: "العربون (10%):",
      depositPrice: "3,000 ريال",
      cta: {
        label: "احجز الآن",
        target: "contact",
      },
    },
    {
      id: "vego-2030-03",
      name: "VEGO 2030",
      image: {
        src: "/images/landing/vego2030.png",
        alt: "دراجة VEGO 2030 الكهربائية",
      },
      fullPriceLabel: "السعر الكامل:",
      fullPrice: "30,000 ريال",
      depositLabel: "العربون (10%):",
      depositPrice: "3,000 ريال",
      cta: {
        label: "احجز الآن",
        target: "contact",
      },
    },
    {
      id: "vego-2030-04",
      name: "VEGO 2030",
      image: {
        src: "/images/landing/vego2030.png",
        alt: "دراجة VEGO 2030 الكهربائية",
      },
      fullPriceLabel: "السعر الكامل:",
      fullPrice: "30,000 ريال",
      depositLabel: "العربون (10%):",
      depositPrice: "3,000 ريال",
      cta: {
        label: "احجز الآن",
        target: "contact",
      },
    },
  ],
};

export const landingPreOrder: PreOrderContent = {
  eyebrow: "MY VEGO - PRE-ORDER",
  title: "تعرف أكثر على نظام",
  highlight: "MY VEGO واحجز الآن",
  description: `منصة إدارة الأسطول الذكية.
تطبيق يربط مالك الدباب الكهربائي بمركبته ليمنحه تجربة استخدام أكثر أمانًا وسهولة.
يمكنك التحكم بالسرعة، تحديد مناطق الاستخدام، استعراض محطات الشحن القريبة، واستلام التنبيهات المهمة من مكان واحد.
My VEGO مخصص للأفراد الذين يمتلكون دبابًا كهربائيًا واحدًا، وكذلك للشركات والجهات التي تمتلك عدة دبابات وتحتاج إلى إدارة الأسطول بطريقة منظمة.`,
  images: [
    {
      src: "/images/landing/vr-70.png",
      alt: "دراجة VEGO زرقاء",
      variant: "wide",
    },
    {
      src: "/images/landing/vego2030.png",
      alt: "دراجة VEGO خضراء",
      variant: "large",
    },
    {
      src: "/images/landing/vg-x8.png",
      alt: "دراجة VEGO X8 للطرق الوعرة",
      variant: "small",
    },
  ],
};

export const landingBrandVision: BrandVisionContent = {
  eyebrow: "02 - BRAND VISION",
  title: [
    { text: "دبابات", tone: "muted" },
    { text: "MY VEGO", tone: "accent" },
    { text: "صممت لجيل", tone: "muted" },
    { text: "جديد", tone: "accent" },
    { text: "من التنقل", tone: "muted" },
  ],
  description:
    "رؤية تتماشى مع طموح المملكة 2030 — تنقل صامت، نظيف، وذكي. كل تفصيلة في VEGO مدروسة لتقدم تجربة قيادة لا تنسى.",
  stats: [
    {
      number: "01",
      value: "10%",
      label: "دفعة أولى فقط",
      description: "احجز موقعك بأقل التزام",
    },
    {
      number: "02",
      value: "4",
      label: "موديلات متاحة",
      description: "تناسب كل أسلوب قيادة",
    },
    {
      number: "03",
      value: "100%",
      label: "دفع إلكتروني آمن",
      description: "عبر بوابة Moyasar",
    },
  ],
};

export const landingPreOrderBenefits: PreOrderBenefitsContent = {
  eyebrow: "04 - PRE-ORDER",
  title: [
    { text: "ضمنت لجيل", tone: "muted" },
    { text: "جديد", tone: "accent" },
    { text: "من", tone: "muted" },
    { text: "الدبابات الكهربائية", tone: "accent" },
  ],
  description:
    "انضم إلى آلاف العملاء الذين حجزوا دراجاتهم الكهربائية وكن من أوائل الأشخاص في المملكة",
  benefits: [
    {
      id: "delivery-priority",
      icon: "zap",
      title: "أولوية التسليم",
      description: "احصل على دراجتك قبل الجميع مع الأولوية الكاملة في التسليم",
    },
    {
      id: "reserved-bike",
      icon: "shield",
      title: "حجز مضمون",
      description: "ضمان حجز دراجتك من الإنتاج المحدود مع إمكانية الإلغاء",
    },
    {
      id: "limited-quantities",
      icon: "flame",
      title: "كميات محدودة",
      description: "عدد محدود من الوحدات المتاحة للحجز المسبق في السعودية",
    },
    {
      id: "secure-payment",
      icon: "card",
      title: "دفع آمن",
      description: "نظام دفع محمي بالكامل عبر بوابة Moyasar الموثوقة",
    },
  ],
};

export const landingPreOrderJourney: PreOrderJourneyContent = {
  eyebrow: "05 - PRE-ORDER JOURNEY",
  title: [
    { text: "خمس خطوات", tone: "muted" },
    { text: "وطلبك يكون جاهز.", tone: "accent" },
  ],
  description:
    "انضم إلى آلاف العملاء الذين حجزوا دراجاتهم الكهربائية وكن من أوائل الأشخاص في المملكة",
  steps: [
    {
      id: "choose-bike",
      number: "01",
      title: "اختر الدراجة",
      description: "تصفح الموديلات الأربعة",
    },
    {
      id: "enter-details",
      number: "02",
      title: "أدخل بياناتك",
      description: "معلومات التواصل والتوصيل",
    },
    {
      id: "review-order",
      number: "03",
      title: "راجع الطلب",
      description: "تأكيد التفاصيل والعربون",
    },
    {
      id: "pay-deposit",
      number: "04",
      title: "ادفع العربون",
      description: "10% عبر بوابة آمنة",
    },
    {
      id: "receive-confirmation",
      number: "05",
      title: "استلم التأكيد",
      description: "أولوية في قائمة التسليم",
    },
  ],
};

export const landingImmersiveTechnology: ImmersiveTechnologyContent = {
  eyebrow: "04 - IMMERSIVE TECHNOLOGY",
  title: [
    { text: "هندسة", tone: "muted" },
    { text: "دقيقة.", tone: "accent" },
    { text: "تفاصيل", tone: "muted" },
    { text: "لا ترى.", tone: "accent" },
  ],
  description:
    "انضم إلى آلاف العملاء الذين حجزوا دراجاتهم الكهربائية وكن من أوائل الأشخاص في المملكة",
  image: {
    src: "/images/landing/vego-technology.jpg",
    alt: "واجهة دراجة VEGO الكهربائية بتقنيات ذكية",
  },
  callouts: [
    {
      id: "smart-battery",
      label: "بطارية ذكية",
      value: "22 أمبير",
      side: "start",
      position: "upper",
    },
    {
      id: "renewed-brakes",
      label: "كبح متجدد",
      value: "ABS Pro",
      side: "start",
      position: "lower",
    },
    {
      id: "electric-motor",
      label: "محرك كهربائي",
      value: "120 كيلوواط",
      side: "end",
      position: "upper",
    },
    {
      id: "adaptive-system",
      label: "نظام تعديلي",
      value: "تكيفي",
      side: "end",
      position: "lower",
    },
  ],
};

export const landingMyVegoApp: MyVegoAppContent = {
  title: [
    { text: "كل ما تحتاجه", tone: "muted" },
    { text: "في تطبيق", tone: "accent" },
    { text: "حمل تطبيق", tone: "muted" },
    { text: "MY VEGO", tone: "brand" },
    { text: "الان", tone: "muted" },
  ],
  description:
    "من إدارة الحجوزات إلى متابعة طلباتك، يمنحك تطبيق VEGO تجربة متكاملة وسلسة في أي وقت.",
  image: {
    src: "/images/landing/my-vego.png",
    alt: "تطبيق My Vego على هواتف ذكية",
  },
  stores: [
    {
      id: "google-play",
      platform: "google-play",
      eyebrow: "Download on the",
      label: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.vego.myvego&hl=en",
    },
    {
      id: "app-store",
      platform: "app-store",
      eyebrow: "Download on the",
      label: "App Store",
      href: "https://apps.apple.com/eg/app/myvego/id6760932250",
    },
  ],
};

export const landingOwners: OwnersContent = {
  eyebrow: "08 - OWNERS",
  title: [
    { text: "أصوات من", tone: "muted" },
    { text: "المستقبل.", tone: "accent" },
  ],
  testimonials: [
    {
      id: "khaled-otaibi",
      quote:
        "أول مرة أشعر بأن دراجتي تنتمي للمستقبل. التصميم لا يقارن، والصمت الكهربائي تجربة بحد ذاتها.",
      name: "خالد العتيبي",
      role: "رائد أعمال، الرياض",
      initials: "خ",
    },
    {
      id: "sara-harbi",
      quote:
        "الحجز بـ 10% فقط جعل القرار سهلا، ولكن ما أدهشني فعلا هو المستوى الذي تقدمه VEGO في كل تفصيلة.",
      name: "سارة الحربي",
      role: "مصممة منتجات، جدة",
      initials: "س",
    },
    {
      id: "abdullah-qahtani",
      quote:
        "كنت أبحث عن دراجة كهربائية بمعايير عالمية، ووجدتها صناعة سعودية تنافس Tesla و Lucid بقوة.",
      name: "عبدالله القحطاني",
      role: "مستثمر، الدمام",
      initials: "ع",
    },
  ],
};
