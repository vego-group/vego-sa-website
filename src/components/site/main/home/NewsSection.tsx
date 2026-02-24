import { newsItems } from "@/data";
import { useTranslations } from "next-intl";
import Image from "next/image";

function NewsSection() {
  const t = useTranslations("home.news");
  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <button
            type="button"
            className="rounded-full border border-primary px-6 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            {t("more")}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {newsItems.map((item) => (
            <article
              key={`${item.title}-${item.image}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 transition hover:-translate-y-1"
            >
              <div className="relative aspect-video bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="space-y-3 px-6 pb-6 pt-5 text-center">
                <h3
                  className="text-lg font-semibold text-primary"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                  }}
                >
                  {t(item.title)}
                </h3>
                <p
                  className="text-sm text-slate-600"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                  }}
                >
                  {t(item.summary)}
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  {t("read-more")}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
