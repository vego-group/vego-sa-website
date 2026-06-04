"use client";

import { ArrowLeft } from "lucide-react";
import type { ReactElement } from "react";

import { depositCopy } from "@/data/landing/deposit";
import type { PersonalInfoFormProps } from "@/interfaces/landing/deposit";
import Loader from "@/components/ui/loader";
import DepositProductSummary from "../product-summary/DepositProductSummary";
import DepositFormField from "./DepositFormField";

function PersonalInfoForm({
  fields,
  productSlug,
  control,
  errors,
  isSubmitting,
  register,
  onSubmit,
}: PersonalInfoFormProps): ReactElement {
  return (
    <div className="flex w-full flex-col gap-6">
      <DepositProductSummary productSlug={productSlug} />

      <form
        noValidate
        onSubmit={onSubmit}
        className="w-full rounded-3xl border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(0,17,45,0.7)_48%,rgba(0,214,111,0.09))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-8"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-black text-white/88">
            البيانات الشخصية
          </h2>
        </div>

        <div className="grid gap-6">
          {fields.map((field) => (
            <DepositFormField
              key={field.id}
              field={field}
              control={control}
              error={errors[field.id]?.message}
              register={register}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-secondary px-6 text-sm font-black text-primary shadow-[0_0_40px_rgba(27,217,137,0.32)] transition hover:bg-secondary/90"
        >
          {isSubmitting ? (
            <Loader borderColor="#00111f" />
          ) : (
            <>
              {depositCopy.details.submitLabel}
              <ArrowLeft className="size-5" aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default PersonalInfoForm;
