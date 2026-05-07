import type { LucideIcon } from "lucide-react";

export interface BikeComparisonItem {
  id: number;
  key: string;
}

export interface BikeComparisonCard {
  id: number;
  key: "electric" | "petrol";
  icon: LucideIcon;
  highlight?: boolean;
  items: BikeComparisonItem[];
}
