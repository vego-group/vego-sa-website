import { Instagram, Linkedin, Twitter } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { TbBrandSnapchat } from "react-icons/tb";

import type { LandingFooterContent } from "@/interfaces/landing/footer";

export const landingFooterContent: LandingFooterContent = {
  logo: {
    src: "/images/admin-logo.svg",
    alt: "VEGO",
  },
  whatsapp: {
    href: "https://wa.me/966579820538",
    ariaLabel: "تواصل معنا على واتساب",
  },
  scrollTopAriaLabel: "العودة إلى أعلى الصفحة",
  description:
    "نقود ثورة التنقل الكهربائي من خلال حلول مبتكرة ومستدامة تعيد تعريف مستقبل المركبات الكهربائية. انضم إلينا لبناء مستقبل أنظف وأكثر خضرة.",
  contact: {
    phone: {
      label: "+966 53 824 1507",
      href: "tel:+966538241507",
    },
    email: {
      label: "info@vego.sa",
      href: "mailto:info@vego.sa",
    },
    locations: [
      {
        id: "hq",
        label: "SaaD tower, Malqa (HQ)",
        href: "https://maps.app.goo.gl/TVW7RBEZjYyoqyZW7?g_st=ic",
      },
      {
        id: "showroom",
        label: "VEGO Northern ring road Riyadh (Showroom)",
        href: "https://maps.app.goo.gl/VcjrLBbBstWjYzbQA?g_st=ic",
      },
      {
        id: "china",
        label: "China Branch",
        href: "https://maps.app.goo.gl/aWRh8mzmzwhWpkSz8",
      },
    ],
  },
  linkGroups: [
    {
      title: "الشركة",
      links: [
        { label: "المنتجات", href: "/products" },
        { label: "فروعنا", href: "/branches" },
        { label: "من نحن", href: "/about" },
      ],
    },
    {
      title: "الدعم",
      links: [
        { label: "تواصل معنا", href: "/contact" },
        { label: "تجربة القيادة", href: "/test-drive" },
      ],
    },
    {
      title: "القانونية",
      links: [
        { label: "سياسة الخصوصية", href: "/privacy-policy" },
        { label: "الشروط والأحكام", href: "/terms-and-conditions" },
        { label: "سياسة ملفات تعريف الارتباط", href: "/cookie-policy" },
      ],
    },
  ],
  socialLinks: [
    {
      label: "WhatsApp",
      icon: FaWhatsapp,
      href: "https://wa.me/966579820538",
    },
    {
      label: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/vego_group1?igsh=MjF1d2s1ajdjeTc2",
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: "https://x.com/vego_group1?s=11",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/company/vego-group1/",
    },
    {
      label: "SnapChat",
      icon: TbBrandSnapchat,
      href: "https://www.snapchat.com/add/vego_group1",
    },
  ],
  rightsReserved: "© 2026 مجموعة VEGO. جميع الحقوق محفوظة.",
  electric: "100% كهرباء. 0% انبعاثات.",
};
