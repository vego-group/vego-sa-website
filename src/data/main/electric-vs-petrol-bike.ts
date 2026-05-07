import { Bike, Fuel } from "lucide-react";

import type { BikeComparisonCard } from "@/interfaces";

export const electricVsPetrolBikeCards: BikeComparisonCard[] = [
  {
    id: 1,
    key: "electric",
    icon: Bike,
    highlight: true,
    items: [
      {
        id: 1,
        key: "charging",
      },
      {
        id: 2,
        key: "maintenance",
      },
    ],
  },
  {
    id: 2,
    key: "petrol",
    icon: Fuel,
    items: [
      {
        id: 1,
        key: "fuel",
      },
      {
        id: 2,
        key: "oil",
      },
      {
        id: 3,
        key: "sparkPlug",
      },
      {
        id: 4,
        key: "filter",
      },
      {
        id: 5,
        key: "chainLubrication",
      },
      {
        id: 6,
        key: "chainSet",
      },
    ],
  },
];
