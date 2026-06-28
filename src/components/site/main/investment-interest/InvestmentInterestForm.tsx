"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import InputErrorMessage from "@/components/ui/InputErrorMessage";
import Loader from "@/components/ui/loader";
import {
  investmentInterestSchema,
  investmentTicketTypeValues,
  type InvestmentInterestSchema,
} from "@/schemas";
import { investmentInterestAPI } from "@/services/mutations/investment-interest";
import TicketTypeDropdown from "./TicketTypeDropdown";

function InvestmentInterestForm() {
  const t = useTranslations("investment-interest.form");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const getValidationMsg = (msg?: string) =>
    msg ? t(msg as never) : undefined;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InvestmentInterestSchema>({
    resolver: zodResolver(investmentInterestSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
      email: "",
      ticket_type: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: InvestmentInterestSchema) => {
    const result = await investmentInterestAPI({
      ...data,
      email: data.email || undefined,
    });

    if (result.ok) {
      toast.success(result.message || t("successMessage"));
      reset();
      return;
    }

    toast.error(result.message || t("errorMessage"));
  };

  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <div
          className="mb-8 flex items-start gap-4"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="rounded-xl bg-linear-to-br from-primary to-secondary p-3 text-white shadow-md">
            <Send className="size-6" />
          </div>
          <div className={isArabic ? "text-right" : "text-left"}>
            <h2 className="text-2xl font-semibold text-primary">
              {t("title")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {t("description")}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField error={getValidationMsg(errors.full_name?.message)}>
              <input
                type="text"
                placeholder={t("fullName")}
                {...register("full_name")}
                className={inputClassName(isArabic)}
              />
            </FormField>
            <FormField error={getValidationMsg(errors.phone_number?.message)}>
              <input
                type="tel"
                placeholder={t("phone")}
                {...register("phone_number")}
                className={inputClassName(isArabic)}
              />
            </FormField>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField error={getValidationMsg(errors.email?.message)}>
              <input
                type="email"
                placeholder={t("email")}
                {...register("email")}
                className={inputClassName(isArabic)}
              />
            </FormField>
            <FormField error={getValidationMsg(errors.ticket_type?.message)}>
              <Controller
                control={control}
                name="ticket_type"
                render={({ field }) => (
                  <TicketTypeDropdown
                    isArabic={isArabic}
                    onChange={field.onChange}
                    options={investmentTicketTypeValues.map((ticketType) => ({
                      value: ticketType,
                      label: t(`ticketTypes.${ticketType}` as never),
                    }))}
                    placeholder={t("ticketTypePlaceholder")}
                    value={field.value}
                  />
                )}
              />
            </FormField>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-xl bg-linear-to-r from-primary to-secondary px-5 py-4 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
          >
            {isSubmitting ? <Loader /> : t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
}

function FormField({
  children,
  error,
}: {
  children: ReactNode;
  error?: string;
}) {
  return (
    <div>
      {children}
      <div className="mt-2">
        <InputErrorMessage msg={error} />
      </div>
    </div>
  );
}

function inputClassName(isArabic: boolean) {
  return `w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 ${
    isArabic ? "text-right" : "text-left"
  }`;
}

export default InvestmentInterestForm;
