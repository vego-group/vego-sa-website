"use client";

import { ArrowLeft, Pencil } from "lucide-react";
import type { ReactElement } from "react";

import { depositCopy } from "@/data/landing/deposit";
import type { DepositReviewProps } from "@/interfaces/landing/deposit";
import DepositProductSummary from "../product-summary/DepositProductSummary";
import DepositReviewField from "./DepositReviewField";

function DepositReview({
  form,
  product,
  onBack,
  onSubmit,
}: DepositReviewProps): ReactElement {
  return (
    <div className="grid gap-6">
      <DepositProductSummary product={product} variant="review" />

      <section className="rounded-3xl border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(0,17,45,0.7)_48%,rgba(0,214,111,0.09))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-white/88">بياناتي الشخصية</h2>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-5 text-sm font-bold text-white/80 transition hover:bg-white/14"
          >
            <Pencil className="size-4" aria-hidden="true" />
            {depositCopy.review.editLabel}
          </button>
        </div>

        <div className="grid gap-6">
          <DepositReviewField label="الاسم الكامل" value={form.fullName} />
          <DepositReviewField label="رقم الجوال" value={form.phone} />
          <DepositReviewField label="البريد الإلكتروني" value={form.email} />
          <DepositReviewField label="المدينة" value={form.city} />
          <DepositReviewField label="ملاحظات (اختياري)" value={form.notes} />
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-secondary px-6 text-sm font-black text-primary shadow-[0_0_40px_rgba(27,217,137,0.32)] transition hover:bg-secondary/90"
        >
          {depositCopy.review.submitLabel}
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}

export default DepositReview;
