import Image from "next/image";
import { useTranslations } from "next-intl";

function InvestmentInterestHero() {
  const t = useTranslations("investment-interest");

  return (
    <section className="relative h-[60vh] overflow-hidden bg-linear-to-br from-emerald-900 via-primary to-emerald-800">
      <div className="absolute inset-0">
        <Image
          src="/images/Ø¯Ø±Ø§Ø¬Ø©-Ø®Ù„ÙÙŠØ©.jpg"
          alt="VEGO investment interest"
          fill
          priority
          quality={90}
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">
          {t("badge")}
        </p>
        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="bg-linear-to-r from-emerald-300 to-white bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-emerald-100/80 sm:text-xl">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default InvestmentInterestHero;
