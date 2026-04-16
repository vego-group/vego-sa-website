"use client";

import { useMemo, useState } from "react";

import { format, isValid, parse } from "date-fns";
import { motion } from "framer-motion";
import { Bike, CalendarRange, Clock3, UserRound } from "lucide-react";
import DatePicker from "react-datepicker";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import type { TestDriveFormProps } from "@/interfaces";
import type { TestDriveFormValues } from "@/types";

import TestDriveField from "./TestDriveField";
import TestDriveProductCard from "./TestDriveProductCard";

function TestDriveForm({ copy, products, locale }: TestDriveFormProps) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const getRequiredMessage = (label: string) =>
    locale === "ar" ? `${label} مطلوب` : `${label} is required`;
  const parseDateValue = (value: string): Date | undefined => {
    if (!value) return undefined;
    const parsed = parse(value, "yyyy-MM-dd", new Date());
    return isValid(parsed) ? parsed : undefined;
  };
  const parseTimeValue = (value: string): Date | undefined => {
    if (!value) return undefined;
    const parsed = parse(value, "HH:mm", new Date());
    return isValid(parsed) ? parsed : undefined;
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestDriveFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      date: "",
      time: "",
      product: "",
    },
    mode: "onChange",
  });

  const selectedProduct = useWatch({ control, name: "product" });
  const selectedGender = useWatch({ control, name: "gender" });
  const selectedProductData = useMemo(
    () => products.find((product) => product.id === selectedProduct),
    [products, selectedProduct],
  );

  const today = new Date().toISOString().split("T")[0] ?? "";

  const onSubmit = async (values: TestDriveFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    toast.success(copy.successMessage);
    reset();
    return values;
  };

  return (
    <section className="pb-20 lg:pb-28">
      <div
        dir={dir}
        className="mx-auto grid max-w-7xl items-start gap-8 px-6 lg:grid-cols-[0.82fr_1.18fr]"
      >
        <aside className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-primary p-8 text-white shadow-[0_28px_70px_-38px_rgba(13,22,63,0.9)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,217,137,0.22),transparent_35%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                <CalendarRange className="size-4 text-secondary" />
                {copy.formBadge}
              </span>

              <h2 className="mt-6 text-3xl font-black tracking-tight">
                {copy.formTitle}
              </h2>
              <p className="mt-4 text-sm leading-8 text-slate-200">
                {copy.formDescription}
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/8 p-5">
                  <div className="flex items-center gap-3">
                    <Bike className="size-5 text-secondary" />
                    <p className="text-sm font-semibold text-white/90">
                      {copy.labels.product}
                    </p>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {selectedProductData?.name ??
                      (locale === "ar"
                        ? "اختر المنتج الذي تريد تجربته"
                        : "Choose the product you want to ride")}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/8 p-5">
                  <div className="flex items-center gap-3">
                    <UserRound className="size-5 text-secondary" />
                    <p className="text-sm font-semibold text-white/90">
                      {copy.labels.gender}
                    </p>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {selectedGender
                      ? copy.genders[selectedGender]
                      : locale === "ar"
                        ? "حدد الجنس"
                        : "Select gender"}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/8 p-5">
                  <div className="flex items-center gap-3">
                    <Clock3 className="size-5 text-secondary" />
                    <p className="text-sm font-semibold text-white/90">
                      {locale === "ar" ? "ملاحظة سريعة" : "Quick note"}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    {locale === "ar"
                      ? "بعد إرسال الطلب سنراجع الموعد المختار ونتواصل معك لتأكيد الحجز بأسرع وقت."
                      : "After submission, we will review your preferred slot and contact you quickly to confirm the booking."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </aside>
        <motion.div
          initial={{ opacity: 0, x: dir === "rtl" ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(241,245,249,0.96)_100%)] p-6 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.45)] sm:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-secondary to-primary" />
          {(isDateOpen || isTimeOpen) && (
            <button
              type="button"
              aria-label="Close picker"
              className="fixed inset-0 z-[9998] cursor-default bg-transparent"
              onClick={() => {
                setIsDateOpen(false);
                setIsTimeOpen(false);
              }}
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="grid gap-6 md:grid-cols-2">
              <TestDriveField
                label={copy.labels.name}
                placeholder={copy.placeholders.name}
                dir={dir}
                error={errors.name?.message}
                {...register("name", {
                  required: getRequiredMessage(copy.labels.name),
                })}
              />
              <TestDriveField
                label={copy.labels.email}
                type="email"
                placeholder={copy.placeholders.email}
                dir={dir}
                error={errors.email?.message}
                {...register("email", {
                  required: getRequiredMessage(copy.labels.email),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: copy.validation.email,
                  },
                })}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <TestDriveField
                label={copy.labels.phone}
                type="tel"
                placeholder="552253991"
                dir="ltr"
                prefix={copy.phoneCountryCode}
                prefixIconSrc="/images/flag.png"
                prefixIconAlt={copy.phoneFlagAlt}
                inputMode="numeric"
                autoComplete="tel-national"
                error={errors.phone?.message}
                {...register("phone", {
                  required: getRequiredMessage(copy.labels.phone),
                  pattern: {
                    value: /^[0-9\s-]{8,20}$/,
                    message: copy.validation.phone,
                  },
                })}
              />
              <TestDriveField
                label={copy.labels.age}
                type="number"
                min="18"
                placeholder={copy.placeholders.age}
                dir={dir}
                error={errors.age?.message}
                {...register("age", {
                  required: getRequiredMessage(copy.labels.age),
                  validate: (value) =>
                    Number(value) >= 18 || copy.validation.age,
                })}
              />
            </div>

            <div>
              <p
                className={`mb-3 text-sm font-semibold text-slate-700 ${
                  dir === "rtl" ? "text-right" : "text-left"
                }`}
              >
                {copy.labels.gender}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {(["male", "female"] as const).map((gender) => {
                  const checked = selectedGender === gender;

                  return (
                    <label
                      key={gender}
                      className={`flex cursor-pointer items-center justify-between rounded-3xl border px-5 py-4 transition-all duration-300 ${
                        checked
                          ? "border-secondary bg-secondary/12 shadow-[0_12px_30px_-24px_rgba(27,217,137,0.95)]"
                          : "border-slate-200 bg-white hover:border-primary/20"
                      }`}
                    >
                      <input
                        type="radio"
                        value={gender}
                        className="sr-only"
                        {...register("gender", {
                          required: getRequiredMessage(copy.labels.gender),
                        })}
                      />
                      <span className="text-sm font-semibold text-primary">
                        {copy.genders[gender]}
                      </span>
                      <span
                        className={`size-5 rounded-full border-2 ${
                          checked
                            ? "border-secondary bg-secondary"
                            : "border-slate-300"
                        }`}
                      />
                    </label>
                  );
                })}
              </div>
              <div className="mt-2 min-h-5">
                <InputErrorMessage msg={errors.gender?.message} />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Controller
                control={control}
                name="date"
                rules={{ required: getRequiredMessage(copy.labels.date) }}
                render={({ field }) => (
                  <label className="block">
                    <span className="mb-3 block text-sm font-semibold text-slate-700 text-start">
                      {copy.labels.date}
                    </span>
                    <div
                      className={`relative ${isDateOpen ? "z-[10000]" : ""}`}
                    >
                      <DatePicker
                        open={isDateOpen}
                        selected={parseDateValue(field.value)}
                        onChange={(date: Date | null) =>
                          field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                        }
                        onInputClick={() => {
                          setIsTimeOpen(false);
                          setIsDateOpen((prev) => !prev);
                        }}
                        onClickOutside={() => setIsDateOpen(false)}
                        onSelect={() => setIsDateOpen(false)}
                        onCalendarClose={() => setIsDateOpen(false)}
                        shouldCloseOnSelect
                        minDate={parseDateValue(today)}
                        placeholderText={
                          copy.placeholders.date ||
                          (locale === "ar" ? "اختر اليوم" : "Select day")
                        }
                        dateFormat={
                          locale === "ar" ? "dd/MM/yyyy" : "MM/dd/yyyy"
                        }
                        calendarStartDay={locale === "ar" ? 6 : 0}
                        popperPlacement={
                          dir === "rtl" ? "bottom-end" : "bottom-start"
                        }
                        wrapperClassName="block w-full"
                        calendarClassName="test-drive-datepicker"
                        className="h-13 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 pe-12 text-sm text-slate-900 shadow-[0_8px_25px_-18px_rgba(15,23,42,0.4)] transition-all duration-300 placeholder:text-slate-400 focus:border-secondary focus:ring-4 focus:ring-secondary/15 text-start"
                      />
                      <CalendarRange className="pointer-events-none absolute end-4 top-1/2 size-5 -translate-y-1/2 text-primary/45" />
                    </div>
                    <div className="mt-2 min-h-5">
                      <InputErrorMessage msg={errors.date?.message} />
                    </div>
                  </label>
                )}
              />
              <Controller
                control={control}
                name="time"
                rules={{ required: getRequiredMessage(copy.labels.time) }}
                render={({ field }) => (
                  <label className="block">
                    <span className="mb-3 block text-sm font-semibold text-slate-700 text-start">
                      {copy.labels.time}
                    </span>
                    <div
                      className={`relative ${isTimeOpen ? "z-[10000]" : ""}`}
                    >
                      <DatePicker
                        open={isTimeOpen}
                        selected={parseTimeValue(field.value)}
                        onChange={(date: Date | null) =>
                          field.onChange(date ? format(date, "HH:mm") : "")
                        }
                        onInputClick={() => {
                          setIsDateOpen(false);
                          setIsTimeOpen((prev) => !prev);
                        }}
                        onClickOutside={() => setIsTimeOpen(false)}
                        onSelect={() => setIsTimeOpen(false)}
                        onCalendarClose={() => setIsTimeOpen(false)}
                        shouldCloseOnSelect
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption={copy.labels.time}
                        placeholderText={
                          copy.placeholders.time ||
                          (locale === "ar" ? "اختر الوقت" : "Select time")
                        }
                        dateFormat={locale === "ar" ? "HH:mm" : "h:mm aa"}
                        popperPlacement={
                          dir === "rtl" ? "bottom-end" : "bottom-start"
                        }
                        wrapperClassName="block w-full"
                        calendarClassName="test-drive-datepicker test-drive-timepicker"
                        className="h-13 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 pe-12 text-sm text-slate-900 shadow-[0_8px_25px_-18px_rgba(15,23,42,0.4)] transition-all duration-300 placeholder:text-slate-400 focus:border-secondary focus:ring-4 focus:ring-secondary/15 text-start"
                      />
                      <Clock3 className="pointer-events-none absolute end-4 top-1/2 size-5 -translate-y-1/2 text-primary/45" />
                    </div>
                    <div className="mt-2 min-h-5">
                      <InputErrorMessage msg={errors.time?.message} />
                    </div>
                  </label>
                )}
              />
            </div>

            <div>
              <div
                className={`mb-3 text-sm font-semibold text-slate-700 ${
                  dir === "rtl" ? "text-right" : "text-left"
                }`}
              >
                {copy.labels.product}
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {products.map((option) => (
                  <label key={option.id}>
                    <input
                      type="radio"
                      value={option.id}
                      className="sr-only"
                      {...register("product", {
                        required: getRequiredMessage(copy.labels.product),
                      })}
                    />
                    <TestDriveProductCard
                      checked={selectedProduct === option.id}
                      option={option}
                    />
                  </label>
                ))}
              </div>
              <div className="mt-2 min-h-5">
                <InputErrorMessage msg={errors.product?.message} />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 w-full rounded-2xl bg-linear-to-r from-primary via-primary to-secondary text-base font-bold text-white shadow-[0_20px_40px_-24px_rgba(13,22,63,0.9)] transition hover:-translate-y-0.5 hover:from-primary/95 hover:to-secondary"
            >
              {isSubmitting ? copy.submitting : copy.submit}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default TestDriveForm;
