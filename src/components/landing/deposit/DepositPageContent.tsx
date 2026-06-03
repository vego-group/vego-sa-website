"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo, useState, type ReactElement } from "react";
import toast from "react-hot-toast";

import {
  depositDefaultPersonalInfo,
  depositPersonalFields,
  depositSteps,
  landingCollection,
} from "@/data/landing";
import type { DepositPageContentProps } from "@/interfaces/landing/deposit";
import type { DepositPersonalInfo, DepositPhase } from "@/types/landing/deposit";
import DepositHero from "./DepositHero";
import PersonalInfoForm from "./form/PersonalInfoForm";
import DepositReview from "./review/DepositReview";
import DepositStepper from "./stepper/DepositStepper";

function DepositPageContent({
  initialProductId,
}: DepositPageContentProps): ReactElement {
  const [phase, setPhase] = useState<DepositPhase>("details");
  const [form, setForm] = useState<DepositPersonalInfo>(
    depositDefaultPersonalInfo,
  );

  const product = useMemo(() => {
    return (
      landingCollection.products.find((item) => item.id === initialProductId) ??
      landingCollection.products[0]
    );
  }, [initialProductId]);

  const updateField = (
    field: keyof DepositPersonalInfo,
    value: string,
  ): void => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleReview = (): void => {
    setPhase("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = (): void => {
    setPhase("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (): void => {
    toast.success("تم تجهيز طلب الحجز للانتقال إلى الدفع");
  };

  return (
    <main className="relative isolate overflow-hidden bg-[#00091f] px-6 py-12 text-white sm:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(0,214,111,0.18),transparent_28%),radial-gradient(circle_at_78%_36%,rgba(0,123,181,0.18),transparent_32%),linear-gradient(135deg,#00111f_0%,#00091f_46%,#03001f_100%)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="flex justify-start">
          <Link
            href="/landing"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-5 text-sm font-bold text-white/76 transition hover:bg-white/14"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
            العودة للرئيسية
          </Link>
        </div>

        <DepositStepper steps={depositSteps} phase={phase} />
        <DepositHero phase={phase} />

        {phase === "details" ? (
          <PersonalInfoForm
            fields={depositPersonalFields}
            form={form}
            product={product}
            onChange={updateField}
            onSubmit={handleReview}
          />
        ) : (
          <DepositReview
            form={form}
            product={product}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
}

export default DepositPageContent;
