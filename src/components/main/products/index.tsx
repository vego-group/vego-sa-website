"use client";

import ElectricMotorcycles from "./ElectricMotorcycles";
import DeliverySolutions from "./DeliverySolutions";
import ProductsHero from "./ProductsHero";
import MicromobilitySection from "./MicromobilitySection";
import ChargingSystemsSection from "./ChargingSystemsSection";

function Products() {
  return (
    <div className="space-y-20">
      <ProductsHero />
      <ElectricMotorcycles />
      <DeliverySolutions />
      <MicromobilitySection />
      <ChargingSystemsSection />
    </div>
  );
}

export default Products;
