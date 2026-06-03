import { LandingNavItem } from "@/interfaces/landing/navbar";

export type LandingNavbarProps = {
  items?: LandingNavItem[];
};

export type LandingNavListProps = {
  items: LandingNavItem[];
  onItemClick?: () => void;
};

export type LandingNavLinkProps = {
  item: LandingNavItem;
  onClick?: () => void;
};
