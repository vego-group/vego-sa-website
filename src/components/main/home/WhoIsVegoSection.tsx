import { useTranslations } from "next-intl";

function WhoIsVegoSection() {
  const t = useTranslations("home.who-is-vego");
  return (
    <section>
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {t("description")}
        </p>
      </div>
    </section>
  );
}

export default WhoIsVegoSection;
