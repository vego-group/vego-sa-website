import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";

function HeroSection() {
  const t = useTranslations("home.hero");
  return (
    <section className="relative overflow-hidden bg-primary h-[calc(100svh-80px)] md:h-[calc(100svh-88px)]">
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

        <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <HeroButton href="/investment-interest">
            {t("investment-interest")}
          </HeroButton>

          <HeroButton href="/test-drive">
            {t("test-drive")}
          </HeroButton>

          <HeroButton href="/electric-vs-petrol-motorcycle">
            {t("compare-costs")}
          </HeroButton>
        </div>
      </div>
    </section>
  );
}

type HeroButtonProps = {
  children: ReactNode;
  href: ComponentProps<typeof Link>["href"];
};

function HeroButton({ children, href }: HeroButtonProps) {
  const locale = useLocale();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={href}
      className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-secondary/60 bg-white/10 px-5 py-3 text-center text-sm font-semibold leading-snug text-white shadow-lg shadow-emerald-950/40 backdrop-blur transition hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary/20 hover:shadow-xl hover:shadow-secondary/20"
    >
      <span className="whitespace-normal">{children}</span>
      <Arrow className="size-4 shrink-0 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}

export default HeroSection;
