"use client";

import { useTranslations } from "next-intl";
import ElectricVsPetrolMotorcycleHeader from "./Header";
import { electricVsPetrolMotorcycleCards } from "@/data";
import ElectricVsPetrolMotorcycleCard from "./card";
import ElectricVsPetrolMotorcycleNote from "./Note";

function ElectricVsPetrolMotorcycle() {
  const t = useTranslations("electric-vs-petrol-motorcycle");

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-10 h-72 bg-linear-to-r from-primary/10 via-secondary/10 to-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <ElectricVsPetrolMotorcycleHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {electricVsPetrolMotorcycleCards.map((card, index) => (
            <ElectricVsPetrolMotorcycleCard
              key={card.id}
              card={card}
              index={index}
              totalLabel={t("totalLabel")}
              getText={(key) => t(key)}
            />
          ))}
        </div>

        <ElectricVsPetrolMotorcycleNote note={t("note")} />
      </div>
    </section>
  );
}

export default ElectricVsPetrolMotorcycle;
