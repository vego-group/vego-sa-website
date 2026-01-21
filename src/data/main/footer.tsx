import { FooterLink, SocialLink } from "@/interfaces/footer";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export const footerLinks: FooterLink[] = [
  {
    title: "Products",
    links: [
      "Electric Motorcycles",
      "Electric Scooters",
      "Electric Bikes",
      "Accessories",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Our Technology", "Sustainability", "Careers"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Warranty", "Service Centers"],
  },
  {
    title: "Legal",
    links: [
      "Privacy Policy",
      "Terms of Service",
      "Return Policy",
      "Shipping Info",
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
