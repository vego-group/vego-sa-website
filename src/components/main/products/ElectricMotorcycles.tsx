"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";

function ElectricMotorcycles() {
  const features = [
    "Smart Battery System",
    "Fast Charging",
    "AI Navigation",
    "Eco-Friendly Design",
    "Remote Monitoring",
    "5-Year Warranty"
  ];

  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center">
        {/* Image Side */}
        <div className="md:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src="/images/دراجات فيجو الكهربائية.jpg"
              alt="VEGO Electric Motorcycle"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
        
        {/* Content Side */}
        <div className="space-y-6 md:w-1/2">
          <div>
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-800">
              Flagship Product
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              Electric Motorcycles
            </h2>
          </div>
          
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            The ultimate generation of electric transport combines intelligence, modern technologies, and innovative design to create a leading Saudi industry. VEGO electric motorcycles carry a sustainable future vision powered by smart technology to support the future of intelligent mobility.
          </p>
          
          <div className="pt-4">
            <Link href="/products/electric-motorcycles">
              <Button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:bg-emerald-600">
                Learn More
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
                  <path
                    d="M5 12h12m0 0l-4-4m4 4l-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </Link>
          </div>
          
          {/* Features List */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <svg className="h-3 w-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ElectricMotorcycles;