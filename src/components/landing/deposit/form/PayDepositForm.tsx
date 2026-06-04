"use client";

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CreditCard,
  LockKeyhole,
  User,
  type LucideIcon,
} from "lucide-react";
import type { ChangeEvent, ReactElement } from "react";

import { depositCopy } from "@/data/landing/deposit";
import type { PayDepositFormProps } from "@/interfaces/landing/deposit";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import Loader from "@/components/ui/loader";
import DepositProductSummary from "../product-summary/DepositProductSummary";

type PaymentFieldProps = {
  icon: LucideIcon;
  label: string;
  error?: string;
  children: ReactElement;
};

function PaymentField({
  icon: Icon,
  label,
  error,
  children,
}: PaymentFieldProps): ReactElement {
  return (
    <label className="grid gap-3">
      <span className="flex items-center gap-2 text-sm font-bold text-white/86">
        <span className="grid size-7 place-items-center rounded-full bg-secondary/15 text-secondary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        {label}
      </span>
      {children}
      <InputErrorMessage msg={error} />
    </label>
  );
}

function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiryDate(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function PayDepositForm({
  productSlug,
  errors,
  isSubmitting,
  register,
  onBack,
  onSubmit,
}: PayDepositFormProps): ReactElement {
  const cardHolderName = register("cardHolderName");
  const cardNumber = register("cardNumber");
  const expiryDate = register("expiryDate");
  const cvv = register("cvv");
  const inputClassName =
    "h-14 w-full rounded-2xl border border-white/12 bg-white/6 px-5 text-white placeholder:text-white/32 transition focus:border-secondary/70 focus:bg-white/9 focus:outline-none";

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.value = formatCardNumber(event.currentTarget.value);
    void cardNumber.onChange(event);
  };

  const handleExpiryDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.value = formatExpiryDate(event.currentTarget.value);
    void expiryDate.onChange(event);
  };

  const handleCvvChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.value = event.currentTarget.value
      .replace(/\D/g, "")
      .slice(0, 4);
    void cvv.onChange(event);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <DepositProductSummary productSlug={productSlug} />

      <form
        noValidate
        onSubmit={onSubmit}
        className="w-full rounded-3xl border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(0,17,45,0.7)_48%,rgba(0,214,111,0.09))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-8"
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-white/88">بيانات الدفع</h2>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-5 text-sm font-bold text-white/80 transition hover:bg-white/14"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
            {depositCopy["pay-deposit"].backLabel}
          </button>
        </div>

        <div className="grid gap-6">
          <PaymentField
            icon={User}
            label="اسم حامل البطاقة"
            error={errors.cardHolderName?.message}
          >
            <input
              type="text"
              autoComplete="cc-name"
              aria-invalid={Boolean(errors.cardHolderName)}
              placeholder="Ahmad AlZahrani"
              {...cardHolderName}
              className={inputClassName}
            />
          </PaymentField>

          <PaymentField
            icon={CreditCard}
            label="رقم البطاقة"
            error={errors.cardNumber?.message}
          >
            <input
              dir="ltr"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              maxLength={23}
              aria-invalid={Boolean(errors.cardNumber)}
              placeholder="4201 3201 1111 1010"
              {...cardNumber}
              onChange={handleCardNumberChange}
              className={inputClassName}
            />
          </PaymentField>

          <div className="grid gap-6 sm:grid-cols-2">
            <PaymentField
              icon={Calendar}
              label="تاريخ الانتهاء"
              error={errors.expiryDate?.message}
            >
              <input
                dir="ltr"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                maxLength={5}
                aria-invalid={Boolean(errors.expiryDate)}
                placeholder="05/27"
                {...expiryDate}
                onChange={handleExpiryDateChange}
                className={inputClassName}
              />
            </PaymentField>

            <PaymentField
              icon={LockKeyhole}
              label="CVV"
              error={errors.cvv?.message}
            >
              <input
                dir="ltr"
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                maxLength={4}
                aria-invalid={Boolean(errors.cvv)}
                placeholder="886"
                {...cvv}
                onChange={handleCvvChange}
                className={inputClassName}
              />
            </PaymentField>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-secondary px-6 text-sm font-black text-primary shadow-[0_0_40px_rgba(27,217,137,0.32)] transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader borderColor="#00111f" />
          ) : (
            <>
              {depositCopy["pay-deposit"].submitLabel}
              <ArrowLeft className="size-5" aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default PayDepositForm;
