export interface MotorcycleComparisonItem {
  id: number;
  key: string;
}

export interface MotorcycleComparisonCard {
  id: number;
  key: "electric" | "petrol";
  highlight?: boolean;
  items: MotorcycleComparisonItem[];
}
