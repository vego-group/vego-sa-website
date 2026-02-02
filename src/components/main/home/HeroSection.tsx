import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

function HeroSection() {
  const t = useTranslations("home.hero");
  return (
    <section className="relative overflow-hidden bg-primary h-svh">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-motorcycle.jpg"
          alt="Electric mobility showcase"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/70 via-primary/60 to-primary/80" />
      </div>

      <div className="relative mx-auto h-full flex max-w-7xl flex-col justify-center items-center px-6 pb-20 pt-28 text-center text-white md:min-h-160 md:pt-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/30 px-5 py-2 text-sm font-semibold text-emerald-100 shadow-lg shadow-emerald-900/40">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 text-secondary"
          >
            <path
              d="M13.5 2.5L4.5 14h6l-1 7.5 9-11.5h-6l1-7.5z"
              fill="currentColor"
            />
          </svg>
          {t("subtitle")}
        </span>

        <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-base text-slate-100 sm:text-lg">
          {t("description")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400"
          >
            {t("discover-our-products")}
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
          <Button
            type="button"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-white/70 hover:text-white"
          >
            {t("contact-us")}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
