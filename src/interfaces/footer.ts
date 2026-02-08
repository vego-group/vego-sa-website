import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export interface FooterLink {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}
export interface SocialLink {
  label: string;
  icon: LucideIcon | IconType;
  href: string;
}
