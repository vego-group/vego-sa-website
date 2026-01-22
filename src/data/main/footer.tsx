import { FooterLink, SocialLink } from "@/interfaces/footer";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export const footerLinks: FooterLink[] = [
  {
    title: "products.title",
    links: [
      "products.electric-motorcycles",
      "products.electric-scooters",
      "products.electric-bikes",
      "products.accessories",
    ],
  },
  {
    title: "company.title",
    links: [
      "company.about-us",
      "company.our-technology",
      "company.sustainability",
      "company.careers",
    ],
  },
  {
    title: "support.title",
    links: [
      "support.help-center",
      "support.contact-us",
      "support.warranty",
      "support.service-centers",
    ],
  },
  {
    title: "legal.title",
    links: [
      "legal.privacy-policy",
      "legal.terms-of-service",
      "legal.return-policy",
      "legal.shipping-info",
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "Twitter", icon: Twitter },
  { label: "LinkedIn", icon: Linkedin },
  { label: "YouTube", icon: Youtube },
];
