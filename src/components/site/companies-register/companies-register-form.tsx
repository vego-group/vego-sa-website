"use client";

import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  companiesRegisterSchema,
  normalizeSaudiPhone,
  type CompaniesRegisterSchema,
} from "@/schemas/companies-register";
import { useRegisterCompany } from "@/hooks/api/companies-register";
import { FileUploadField } from "./file-upload-field";

export const CompaniesRegisterForm = () => {
  const t = useTranslations("companiesRegister");
  const tValidation = useTranslations("companiesRegister.validation");
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompaniesRegisterSchema>({
    resolver: zodResolver(companiesRegisterSchema),
    mode: "onBlur",
    defaultValues: {
      company_name: "",
      contact_person_name: "",
      contact_phone: "",
      contact_email: "",
      commercial_reg_no: "",
      address: "",
      city: "",
      region: "",
      tax_id: "",
    },
  });

  const { mutateAsync, isPending } = useRegisterCompany();

  const onSubmit: SubmitHandler<CompaniesRegisterSchema> = async (values) => {
    setSubmitError(null);

    try {
      // normalize phone to 9665XXXXXXXX before submit (matches schema regex)
      const normalizedValues: CompaniesRegisterSchema = {
        ...values,
        contact_phone: normalizeSaudiPhone(values.contact_phone),
      };

      const response = await mutateAsync(normalizedValues);

      // safeApi returns { ok: boolean, status: number, data?, error?, message }
      if (!response.ok) {
        setSubmitError(response.message || t("errorMessage"));
        return;
      }

      reset();
      setSubmittedSuccessfully(true);
      setTimeout(() => setSubmittedSuccessfully(false), 8000);
    } catch (error) {
      // safeApi shouldn't throw, but guard just in case
      const err = error as { message?: string };
      setSubmitError(err?.message || t("errorMessage"));
    }
  };

  // Helper to translate validation messages from zod
  const getErrorMessage = (key?: string) => {
    if (!key) return undefined;
    if (key.startsWith("validation.")) {
      return tValidation(key.replace("validation.", ""));
    }
    return key;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-3xl space-y-8 rounded-2xl bg-white p-6 shadow-sm md:p-10"
      noValidate
    >
      {submittedSuccessfully && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
        >
          <p className="font-semibold">{t("successTitle")}</p>
          <p className="text-sm">{t("successMessage")}</p>
        </div>
      )}

      {submitError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
        >
          <p className="font-semibold">{t("errorTitle")}</p>
          <p className="text-sm">{submitError}</p>
        </div>
      )}

      {/* ==================== SECTION: Company Information ==================== */}
      <section className="space-y-4">
        <header className="border-b pb-2">
          <h2 className="text-lg font-bold text-gray-900">
            {t("sections.companyInfo")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("sections.companyInfoDesc")}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Company Name * */}
          <div className="md:col-span-2">
            <label htmlFor="company_name" className="mb-1 block text-sm font-medium">
              {t("fields.companyName")} <span className="text-red-500">*</span>
            </label>
            <input
              id="company_name"
              type="text"
              {...register("company_name")}
              placeholder={t("placeholders.companyName")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.company_name && (
              <p className="mt-1 text-xs text-red-500">
                {getErrorMessage(errors.company_name.message)}
              </p>
            )}
          </div>

          {/* Commercial Registration No * */}
          <div>
            <label htmlFor="commercial_reg_no" className="mb-1 block text-sm font-medium">
              {t("fields.commercialRegNo")} <span className="text-red-500">*</span>
            </label>
            <input
              id="commercial_reg_no"
              type="text"
              {...register("commercial_reg_no")}
              placeholder="CR1234567890"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.commercial_reg_no && (
              <p className="mt-1 text-xs text-red-500">
                {getErrorMessage(errors.commercial_reg_no.message)}
              </p>
            )}
          </div>

          {/* Tax ID (optional) */}
          <div>
            <label htmlFor="tax_id" className="mb-1 block text-sm font-medium">
              {t("fields.taxId")}
            </label>
            <input
              id="tax_id"
              type="text"
              {...register("tax_id")}
              placeholder="300123456700003"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.tax_id && (
              <p className="mt-1 text-xs text-red-500">
                {getErrorMessage(errors.tax_id.message)}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ==================== SECTION: Contact Person ==================== */}
      <section className="space-y-4">
        <header className="border-b pb-2">
          <h2 className="text-lg font-bold text-gray-900">
            {t("sections.contactInfo")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("sections.contactInfoDesc")}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Contact Person Name * */}
          <div>
            <label htmlFor="contact_person_name" className="mb-1 block text-sm font-medium">
              {t("fields.contactPersonName")} <span className="text-red-500">*</span>
            </label>
            <input
              id="contact_person_name"
              type="text"
              {...register("contact_person_name")}
              placeholder={t("placeholders.contactPersonName")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.contact_person_name && (
              <p className="mt-1 text-xs text-red-500">
                {getErrorMessage(errors.contact_person_name.message)}
              </p>
            )}
          </div>

          {/* Contact Phone * */}
          <div>
            <label htmlFor="contact_phone" className="mb-1 block text-sm font-medium">
              {t("fields.contactPhone")} <span className="text-red-500">*</span>
            </label>
            <input
              id="contact_phone"
              type="tel"
              dir="ltr"
              {...register("contact_phone", {
                setValueAs: (v) => normalizeSaudiPhone(v),
              })}
              placeholder="966512345678"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.contact_phone && (
              <p className="mt-1 text-xs text-red-500">
                {getErrorMessage(errors.contact_phone.message)}
              </p>
            )}
          </div>

          {/* Contact Email * */}
          <div className="md:col-span-2">
            <label htmlFor="contact_email" className="mb-1 block text-sm font-medium">
              {t("fields.contactEmail")} <span className="text-red-500">*</span>
            </label>
            <input
              id="contact_email"
              type="email"
              dir="ltr"
              {...register("contact_email")}
              placeholder="contact@company.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.contact_email && (
              <p className="mt-1 text-xs text-red-500">
                {getErrorMessage(errors.contact_email.message)}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ==================== SECTION: Address ==================== */}
      <section className="space-y-4">
        <header className="border-b pb-2">
          <h2 className="text-lg font-bold text-gray-900">
            {t("sections.address")}
          </h2>
          <p className="text-sm text-gray-500">{t("sections.addressDesc")}</p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="address" className="mb-1 block text-sm font-medium">
              {t("fields.address")}
            </label>
            <input
              id="address"
              type="text"
              {...register("address")}
              placeholder={t("placeholders.address")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">
                {getErrorMessage(errors.address.message)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="city" className="mb-1 block text-sm font-medium">
              {t("fields.city")}
            </label>
            <input
              id="city"
              type="text"
              {...register("city")}
              placeholder="Riyadh"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="region" className="mb-1 block text-sm font-medium">
              {t("fields.region")}
            </label>
            <input
              id="region"
              type="text"
              {...register("region")}
              placeholder="Riyadh Province"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* ==================== SECTION: Fleet & Billing ==================== */}
      <section className="space-y-4">
        <header className="border-b pb-2">
          <h2 className="text-lg font-bold text-gray-900">
            {t("sections.fleetBilling")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("sections.fleetBillingDesc")}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="max_motorcycles" className="mb-1 block text-sm font-medium">
              {t("fields.maxMotorcycles")}
            </label>
            <input
              id="max_motorcycles"
              type="number"
              min={0}
              {...register("max_motorcycles", {
                setValueAs: (v) =>
                  v === "" || v === null || v === undefined
                    ? undefined
                    : Number(v),
              })}
              placeholder="100"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.max_motorcycles && (
              <p className="mt-1 text-xs text-red-500">
                {getErrorMessage(errors.max_motorcycles.message)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="max_drivers" className="mb-1 block text-sm font-medium">
              {t("fields.maxDrivers")}
            </label>
            <input
              id="max_drivers"
              type="number"
              min={0}
              {...register("max_drivers", {
                setValueAs: (v) =>
                  v === "" || v === null || v === undefined
                    ? undefined
                    : Number(v),
              })}
              placeholder="200"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.max_drivers && (
              <p className="mt-1 text-xs text-red-500">
                {getErrorMessage(errors.max_drivers.message)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="billing_type" className="mb-1 block text-sm font-medium">
              {t("fields.billingType")}
            </label>
            <select
              id="billing_type"
              {...register("billing_type", {
                setValueAs: (v) => (v === "" ? undefined : v),
              })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">{t("placeholders.selectBilling")}</option>
              <option value="prepaid">{t("billingOptions.prepaid")}</option>
              <option value="postpaid">{t("billingOptions.postpaid")}</option>
            </select>
          </div>
        </div>
      </section>

      {/* ==================== SECTION: Documents ==================== */}
      <section className="space-y-4">
        <header className="border-b pb-2">
          <h2 className="text-lg font-bold text-gray-900">
            {t("sections.documents")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("sections.documentsDesc")}
          </p>
        </header>

        <div className="space-y-4">
          {/* Commercial Reg File - REQUIRED */}
          <Controller
            name="commercial_reg_file"
            control={control}
            render={({ field }) => (
              <FileUploadField
                id="commercial_reg_file"
                label={t("fields.commercialRegFile")}
                required
                value={field.value}
                onChange={field.onChange}
                error={getErrorMessage(errors.commercial_reg_file?.message)}
                helpText={t("fileHelp")}
              />
            )}
          />

          {/* Commercial License File - OPTIONAL */}
          <Controller
            name="commercial_license_file"
            control={control}
            render={({ field }) => (
              <FileUploadField
                id="commercial_license_file"
                label={t("fields.commercialLicenseFile")}
                value={field.value}
                onChange={field.onChange}
                error={getErrorMessage(errors.commercial_license_file?.message)}
                helpText={t("fileHelp")}
              />
            )}
          />

          {/* Sales Contract File - OPTIONAL */}
          <Controller
            name="sales_contract_file"
            control={control}
            render={({ field }) => (
              <FileUploadField
                id="sales_contract_file"
                label={t("fields.salesContractFile")}
                value={field.value}
                onChange={field.onChange}
                error={getErrorMessage(errors.sales_contract_file?.message)}
                helpText={t("fileHelp")}
              />
            )}
          />
        </div>
      </section>

      {/* ==================== Submit Button ==================== */}
      <div className="flex flex-col-reverse gap-3 border-t pt-6 md:flex-row md:items-center md:justify-end">
        <button
          type="button"
          onClick={() => {
            reset();
            setSubmitError(null);
          }}
          disabled={isSubmitting || isPending}
          className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {t("buttons.reset")}
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isPending}
          className="rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting || isPending ? t("buttons.submitting") : t("buttons.submit")}
        </button>
      </div>
    </form>
  );
};