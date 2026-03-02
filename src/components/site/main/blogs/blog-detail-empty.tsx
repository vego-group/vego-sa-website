"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function BlogDetailEmpty() {
  const t = useTranslations("blogs-detail");
  const locale = useLocale();
  const Arrow = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl text-slate-900">{t("notFoundTitle")}</h1>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-secondary hover:underline"
        >
          <Arrow className="h-4 w-4" />
          {t("backToBlog")}
        </Link>
      </div>
    </div>
  );
}

export { BlogDetailEmpty };
