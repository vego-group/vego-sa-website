import { commitmentItems } from "@/data";
import { useTranslations } from "next-intl";

function CommitmentToExcellence() {
  const t = useTranslations("commitment-to-excellence");
  return (
    <section className="pb-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {t("title")}
        </h2>

        <div className="grid w-full gap-10 md:grid-cols-2">
          {commitmentItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="flex flex-col items-center gap-5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {t(item.title)}
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-slate-600 sm:text-base">
                  {t(item.description)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CommitmentToExcellence;
