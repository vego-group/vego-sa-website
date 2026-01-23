"use client";

import Image from "next/image";

function MicromobilitySection() {
  return (
    <section className="py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 md:flex-row md:items-center">
        {/* Image Side */}
        <div className="md:w-1/2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-primary/20">
            <Image
              src="/images/micromobility.jpg" // ضع الصورة المناسبة هنا
              alt="VEGO Micromobility Solutions"
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 via-transparent to-transparent" />
          </div>
        </div>
        
        {/* Content Side */}
        <div className="space-y-8 md:w-1/2">
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                Urban Innovation
              </span>
              <h2 className="mt-6 font-serif text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Micromobility Solutions
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
                Micromobility represents the future of urban transportation, offering smart and eco-friendly solutions that help reduce congestion and lower emissions.
              </p>
              
              <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
                At VEGO, we provide an integrated ecosystem of electric bikes and scooters designed to meet the needs of individuals and businesses for fast, efficient urban mobility.
              </p>
              
              <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
                VEGO&apos;s micromobility solutions redefine city travel with greater efficiency, flexibility, and a more sustainable experience.
              </p>
            </div>
          </div>
          
          {/* Features List */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-white p-8 shadow-xl">
            <h3 className="mb-6 font-serif text-2xl font-semibold text-slate-900">
              Urban Mobility Advantages
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { title: "Eco-Friendly Commuting", icon: "♻️" },
                { title: "Smart Battery Technology", icon: "🔋" },
                { title: "Compact Urban Design", icon: "🏙️" },
                { title: "Real-time GPS Tracking", icon: "📍" },
                { title: "Fast Charging System", icon: "⚡" },
                { title: "Low Maintenance Cost", icon: "💰" }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-blue-100 text-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{feature.title}</h4>
                    <div className="mt-1 h-1 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
              {[
                { value: "60%", label: "Faster Commute" },
                { value: "0g/km", label: "Zero Emissions" },
                { value: "85%", label: "Cost Saving" }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-1 text-sm font-medium text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MicromobilitySection;