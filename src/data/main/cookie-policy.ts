import type {
  CookiePolicyContent,
  CookiesPolicySection,
} from "@/interfaces/site/main/cookie-policy";
import { CookiePolicyLocale } from "@/types/main/cookie-policy";

const cookiePolicyContentByLocale: Record<CookiePolicyLocale, CookiePolicyContent> =
  {
  ar: {
    hero: {
      eyebrow: "VEGO Legal",
      title: "سياسة ملفات تعريف الارتباط",
      description:
        "نوضح في هذه الصفحة كيف نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح، وتخصيص المحتوى، وفهم كيفية استخدام موقعنا بشكل أفضل.",
    },
    intro: {
      eyebrow: "Cookie Policy",
      title: "نظرة عامة",
      description:
        "في مجموعة فيجو، نستخدم ملفات تعريف الارتباط والتقنيات المشابهة لتقديم تجربة أكثر سلاسة ووضوحًا عند زيارة موقعنا. استمرارك في استخدام الموقع يعني موافقتك على استخدام هذه الملفات وفقًا لهذه السياسة.",
      highlights: [
        "نستخدم ملفات أساسية لتشغيل الموقع بشكل صحيح وآمن.",
        "بعض الملفات تساعدنا على فهم سلوك المستخدم وتحسين الأداء.",
        "يمكنك إدارة تفضيلاتك أو تعطيل بعض الملفات من خلال إعدادات المتصفح.",
      ],
    },
    sections: [
      {
        id: "what-are-cookies",
        title: "1. ما هي ملفات تعريف الارتباط؟",
        description:
          "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقع إلكتروني. تساعد هذه الملفات على تذكر تفضيلاتك، وتحسين تجربة الاستخدام، ودعم الوظائف الأساسية للموقع خلال جلسة التصفح أو لفترة زمنية محددة.",
        tone: "primary",
        featured: true,
      },
      {
        id: "types-of-cookies",
        title: "2. أنواع ملفات تعريف الارتباط التي نستخدمها",
        items: [
          {
            label: "ملفات تعريف الارتباط الأساسية",
            description:
              "ضرورية لتشغيل الموقع وتمكين الوظائف الرئيسية مثل الأمان، والمصادقة، وإمكانية الوصول.",
          },
          {
            label: "ملفات الأداء والتحليلات",
            description:
              "تساعدنا على فهم كيفية تفاعل الزوار مع الموقع وتحليل الصفحات التي تتم زيارتها والأخطاء التي قد تظهر لتحسين الأداء.",
          },
          {
            label: "ملفات التفضيلات والوظائف",
            description:
              "تتذكر اللغة والإعدادات والخيارات التي يحددها المستخدم لتقديم تجربة أكثر تخصيصًا.",
          },
          {
            label: "ملفات الإعلانات",
            description:
              "قد تُستخدم لعرض محتوى أو رسائل تسويقية أكثر ارتباطًا باهتمامات الزائر، مع تقليل التكرار وتحسين قياس الفعالية.",
          },
        ],
        tone: "secondary",
        featured: true,
      },
      {
        id: "how-we-use-cookies",
        title: "3. كيف نستخدم ملفات تعريف الارتباط؟",
        bullets: [
          "تقديم تجربة مخصصة على موقعنا.",
          "تمكين الوظائف الأساسية مثل مصادقة المستخدم وحماية الجلسات.",
          "تحليل كيفية استخدام الزوار للموقع والخدمات المرتبطة به.",
          "تحسين الأداء والمحتوى والعناصر التسويقية بحسب تفضيلات المستخدم.",
          "تذكر إعدادات اللغة وتجربة الاستخدام بشكل عام.",
        ],
        tone: "primary",
      },
      {
        id: "third-party-cookies",
        title: "4. ملفات تعريف الارتباط الخاصة بأطراف ثالثة",
        description:
          "إضافة إلى ملفات تعريف الارتباط الخاصة بنا، قد نسمح لأطراف ثالثة بتعيين ملفات على جهازك لأغراض متنوعة تشمل التحليلات والإعلانات وقياس الأداء. تخضع هذه الملفات لسياسات الخصوصية الخاصة بتلك الجهات.",
        tone: "secondary",
      },
      {
        id: "your-choices",
        title: "5. خياراتك بخصوص ملفات تعريف الارتباط",
        bullets: [
          "يمكنك قبول أو رفض بعض أنواع ملفات تعريف الارتباط من خلال إعدادات المتصفح.",
          "تعطيل بعض الملفات قد يؤثر على وظائف محددة داخل الموقع أو على تجربة الاستخدام.",
          "يمكنك إلغاء الاشتراك في بعض الإعلانات المستندة إلى الاهتمامات من خلال أدوات الجهات التنظيمية المعتمدة.",
        ],
        tone: "primary",
      },
      {
        id: "policy-updates",
        title: "6. تغييرات على سياسة ملفات تعريف الارتباط",
        description:
          "قد نقوم بتحديث هذه السياسة من وقت لآخر لتعكس أي تغييرات في ممارساتنا أو المتطلبات التنظيمية. سيتم نشر أي تحديثات على هذه الصفحة، وننصح بمراجعتها بشكل دوري.",
        tone: "secondary",
      },
      {
        id: "contact-us",
        title: "7. اتصل بنا",
        description:
          "إذا كانت لديك أي أسئلة أو استفسارات حول سياسة ملفات تعريف الارتباط الخاصة بنا، يمكنك التواصل معنا عبر القنوات التالية.",
        tone: "primary",
      },
    ],
    contact: {
      title: "تواصل معنا",
      description:
        "نجيب على أي استفسارات متعلقة باستخدام ملفات تعريف الارتباط أو إعدادات الخصوصية المرتبطة بالموقع.",
      company: "مجموعة فيجو",
      location: "الرياض، المملكة العربية السعودية",
      emailLabel: "البريد الإلكتروني",
      email: "info@vego.sa",
    },
    banner: {
      title: "إعدادات ملفات تعريف الارتباط",
      description:
        "يمكنك حفظ تفضيلك بخصوص ملفات تعريف الارتباط غير الأساسية. الملفات الأساسية ستظل فعالة لضمان عمل الموقع.",
      acceptLabel: "قبول",
      declineLabel: "رفض",
      acceptedMessage:
        "تم حفظ تفضيلك بالموافقة على ملفات تعريف الارتباط غير الأساسية.",
      rejectedMessage: "تم حفظ تفضيلك برفض ملفات تعريف الارتباط غير الأساسية.",
    },
  },
  en: {
    hero: {
      eyebrow: "VEGO Legal",
      title: "Cookie Policy",
      description:
        "This page explains how we use cookies and similar technologies to improve browsing, personalize content, and understand how our website is used.",
    },
    intro: {
      eyebrow: "Cookie Policy",
      title: "Overview",
      description:
        "At Vego Group, we use cookies and similar technologies to deliver a smoother browsing experience, support core site functionality, and better understand how visitors interact with our website.",
      highlights: [
        "Essential cookies keep the website secure and functioning properly.",
        "Performance cookies help us analyze visitor behavior and improve the experience.",
        "You can manage your preferences or disable some cookies through your browser settings.",
      ],
    },
    sections: [
      {
        id: "what-are-cookies",
        title: "1. What are cookies?",
        description:
          "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve usability, and support essential functionality during a session or for a defined period.",
        tone: "primary",
        featured: true,
      },
      {
        id: "types-of-cookies",
        title: "2. Types of cookies we use",
        items: [
          {
            label: "Essential cookies",
            description:
              "Required for the website to function correctly, including security, authentication, and accessibility features.",
          },
          {
            label: "Performance and analytics cookies",
            description:
              "Help us understand how visitors use the site, which pages perform well, and where errors occur so we can improve performance.",
          },
          {
            label: "Preference and functionality cookies",
            description:
              "Remember language, settings, and user choices to deliver a more personalized experience.",
          },
          {
            label: "Advertising cookies",
            description:
              "May be used to show more relevant marketing content, reduce repetition, and measure campaign effectiveness.",
          },
        ],
        tone: "secondary",
        featured: true,
      },
      {
        id: "how-we-use-cookies",
        title: "3. How we use cookies",
        bullets: [
          "Deliver a more tailored browsing experience.",
          "Support core functions such as user authentication and session security.",
          "Analyze how visitors use the website and related services.",
          "Improve content, performance, and marketing relevance.",
          "Remember language and general user experience settings.",
        ],
        tone: "primary",
      },
      {
        id: "third-party-cookies",
        title: "4. Third-party cookies",
        description:
          "In addition to our own cookies, some third parties may place cookies on your device for analytics, advertising, and performance measurement purposes. Those cookies are governed by the privacy policies of the relevant third parties.",
        tone: "secondary",
      },
      {
        id: "your-choices",
        title: "5. Your choices regarding cookies",
        bullets: [
          "You can accept or reject certain types of cookies through your browser settings.",
          "Disabling some cookies may affect specific features or the overall site experience.",
          "You may opt out of certain interest-based advertising through recognized industry tools.",
        ],
        tone: "primary",
      },
      {
        id: "policy-updates",
        title: "6. Changes to this cookie policy",
        description:
          "We may update this policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page, and we encourage you to review it periodically.",
        tone: "secondary",
      },
      {
        id: "contact-us",
        title: "7. Contact us",
        description:
          "If you have any questions or concerns about our cookie policy, you can contact us through the following channel.",
        tone: "primary",
      },
    ],
    contact: {
      title: "Get in touch",
      description:
        "We can help with any questions related to cookies, privacy settings, or how your browsing preferences are handled on our website.",
      company: "Vego Group",
      location: "Riyadh, Saudi Arabia",
      emailLabel: "Email",
      email: "info@vego.sa",
    },
    banner: {
      title: "Cookie preferences",
      description:
        "You can save your preference for non-essential cookies. Essential cookies will remain active so the website can function properly.",
      acceptLabel: "Accept",
      declineLabel: "Decline",
      acceptedMessage:
        "Your preference to allow non-essential cookies has been saved.",
      rejectedMessage:
        "Your preference to decline non-essential cookies has been saved.",
    },
  },
  };

export function getCookiesPolicySections(
  locale: CookiePolicyLocale,
): CookiesPolicySection[] {
  return cookiePolicyContentByLocale[locale].sections;
}

export function getCookiePolicyContent(locale: string): CookiePolicyContent {
  const normalizedLocale: CookiePolicyLocale = locale === "ar" ? "ar" : "en";

  return {
    ...cookiePolicyContentByLocale[normalizedLocale],
    sections: getCookiesPolicySections(normalizedLocale),
  };
}
