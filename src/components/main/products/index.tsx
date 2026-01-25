"use client";

import ElectricMotorcycles from "./ElectricMotorcycles";
import DeliverySolutions from "./DeliverySolutions";
import ProductsHero from "./ProductsHero";
import MicromobilitySection from "./MicromobilitySection";
import ChargingSystemsSection from "./ChargingSystemsSection";

function Products() {
  return (
    <>
      <ProductsHero />
      <div className="py-20 space-y-20">
        <ElectricMotorcycles />
        <DeliverySolutions />
        <MicromobilitySection />
        <ChargingSystemsSection />
      </div>
    </>
  );
}

export default Products;