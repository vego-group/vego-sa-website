import { FooterLink, SocialLink } from "@/interfaces/footer";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { TbBrandSnapchat } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";

export const footerLinks: FooterLink[] = [
  {
    title: "company.title",
    links: [
      { label: "company.products", href: "/products" },
      { label: "company.branches", href: "/branches" },
      { label: "company.about-us", href: "/about-us" },
    ],
  },
  {
    title: "support.title",
    links: [{ label: "support.contact-us", href: "/contact-us" }],
  },
  {
    title: "legal.title",
    links: [
      { label: "legal.privacy-policy", href: "/privacy-policy" },
      { label: "legal.terms-and-conditions", href: "/terms-and-conditions" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "WhatsApp",
    icon: FaWhatsapp,
    href: "https://wa.me/966112345678",
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/vego_group1?igsh=MjF1d2s1ajdjeTc2",
  },
  { label: "Twitter", icon: Twitter, href: "https://x.com/vego_group1?s=11" },
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
];
