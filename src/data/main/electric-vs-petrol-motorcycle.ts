import type { MotorcycleComparisonCard } from "@/interfaces";

export const electricVsPetrolMotorcycleCards: MotorcycleComparisonCard[] = [
  {
    id: 1,
    key: "electric",
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
