"use client";

import InputErrorMessage from "@/components/ui/InputErrorMessage";
import Loader from "@/components/ui/loader";
import Modal from "@/components/ui/modal";
import {
  addFaqSchema,
  type AddFaqFormValues,
  type AddFaqSchema,
} from "@/schemas";
import { addFaqAPI } from "@/services/mutations/faqs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type AddFaqPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ActiveLanguage = "en" | "ar";

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none";
const textAreaClassName = `${inputClassName} resize-none`;

function FieldError({ msg }: { msg?: string }) {
  return (
    <div className="mt-2 min-h-5">
      <InputErrorMessage msg={msg} />
    </div>
  );
}

function AddFaqPopup({ isOpen, onClose }: AddFaqPopupProps) {
  const queryClient = useQueryClient();
  const [activeLanguage, setActiveLanguage] = useState<ActiveLanguage>("en");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddFaqFormValues, unknown, AddFaqSchema>({
    resolver: zodResolver(addFaqSchema),
    mode: "onChange",
    defaultValues: {
      question_en: "",
      question_ar: "",
      answer_en: "",
      answer_ar: "",
      display_order: 1,
      is_active: 0,
    },
  });

  useEffect(() => {
    if (isOpen) return;
    setActiveLanguage("en");
    reset({
      question_en: "",
      question_ar: "",
      answer_en: "",
      answer_ar: "",
      display_order: 1,
      is_active: 0,
    });
  }, [isOpen, reset]);

  const watchedValues = watch();
  const englishFieldKeys: (keyof AddFaqFormValues)[] = [
    "question_en",
    "answer_en",
  ];
  const arabicFieldKeys: (keyof AddFaqFormValues)[] = [
    "question_ar",
    "answer_ar",
  ];

  const hasValue = (value: unknown) =>
    typeof value === "string" ? value.trim().length > 0 : false;

  const isEnglishComplete = englishFieldKeys.every((key) =>
    hasValue(watchedValues[key]),
  );
  const isArabicComplete = arabicFieldKeys.every((key) =>
    hasValue(watchedValues[key]),
  );
  const isCurrentLanguageComplete =
    activeLanguage === "en" ? isEnglishComplete : isArabicComplete;

  const hasAnyFieldError = (
    formErrors: FieldErrors<AddFaqFormValues>,
    keys: (keyof AddFaqFormValues)[],
  ) => keys.some((key) => Boolean(formErrors[key]));

  const onInvalidSubmit = (formErrors: FieldErrors<AddFaqFormValues>) => {
    const currentLanguage = activeLanguage;
    const oppositeLanguage = currentLanguage === "en" ? "ar" : "en";

    const currentLanguageKeys =
      currentLanguage === "en" ? englishFieldKeys : arabicFieldKeys;
    const oppositeLanguageKeys =
      oppositeLanguage === "en" ? englishFieldKeys : arabicFieldKeys;

    if (hasAnyFieldError(formErrors, oppositeLanguageKeys)) {
      setActiveLanguage(oppositeLanguage);
      return;
    }

    if (hasAnyFieldError(formErrors, currentLanguageKeys)) {
      setActiveLanguage(currentLanguage);
    }
  };

  const onSubmit = async (data: AddFaqSchema) => {
    const result = await addFaqAPI(data);
    if (!result?.ok) {
      toast.error(result?.message ?? "Could not create FAQ.");
      return;
    }

    toast.success(result?.message ?? "FAQ created successfully");
    onClose();
    await queryClient.invalidateQueries({ queryKey: ["dashboard", "faqs"] });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Create FAQ"
      titleClassName="text-xl sm:text-2xl font-semibold text-white"
      contentClassName="bg-linear-to-br from-emerald-950 via-primary to-emerald-950 sm:max-w-3xl"
      closeButtonClassname="text-white"
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6"
      >
        <div className="flex flex-col sm:flex-row gap-2 pb-2 -mt-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveLanguage("en")}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors relative rounded-lg sm:rounded-none ${
              activeLanguage === "en"
                ? "text-white bg-secondary/20 sm:bg-transparent"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            <span className="sm:hidden">EN</span>
            <span className="hidden sm:inline">English Version</span>
            {activeLanguage === "en" ? (
              <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => setActiveLanguage("ar")}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors relative rounded-lg sm:rounded-none ${
              activeLanguage === "ar"
                ? "text-white bg-secondary/20 sm:bg-transparent"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            <span className="sm:hidden">AR</span>
            <span className="hidden sm:inline">Arabic Version</span>
            {activeLanguage === "ar" ? (
              <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
            ) : null}
          </button>
        </div>

        <div
          className={
            activeLanguage === "en" ? "space-y-4 sm:space-y-6" : "hidden"
          }
        >
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
              Question (EN) <span className="text-red-400">*</span>
            </label>
            <input
              {...register("question_en")}
              className={inputClassName}
              placeholder="Enter question in English..."
              dir="ltr"
            />
            <FieldError msg={errors.question_en?.message} />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
              Answer (EN) <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("answer_en")}
              rows={5}
              className={textAreaClassName}
              placeholder="Enter answer in English..."
              dir="ltr"
            />
            <FieldError msg={errors.answer_en?.message} />
          </div>
        </div>

        <div
          className={
            activeLanguage === "ar" ? "space-y-4 sm:space-y-6" : "hidden"
          }
          dir="rtl"
        >
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2 text-right">
              السؤال <span className="text-red-400">*</span>
            </label>
            <input
              {...register("question_ar")}
              className={`${inputClassName} text-right`}
              placeholder="أدخل السؤال بالعربية..."
              dir="rtl"
            />
            <FieldError msg={errors.question_ar?.message} />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2 text-right">
              الإجابة <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("answer_ar")}
              rows={5}
              className={`${textAreaClassName} text-right`}
              placeholder="أدخل الإجابة بالعربية..."
              dir="rtl"
            />
            <FieldError msg={errors.answer_ar?.message} />
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 pt-2">
          <h3 className="text-base sm:text-lg font-medium text-white">
            Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
                Display Order
              </label>
                <input
                  type="number"
                  min={1}
                  {...register("display_order", { valueAsNumber: true })}
                  className={inputClassName}
                />
              <FieldError msg={errors.display_order?.message} />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
                Status
              </label>
              <select
                {...register("is_active", { valueAsNumber: true })}
                className={inputClassName}
              >
                <option value={0} className="bg-primary">
                  Save as Draft
                </option>
                <option value={1} className="bg-primary">
                  Publish Now
                </option>
              </select>
              <FieldError msg={errors.is_active?.message} />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 -mb-3 pb-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isCurrentLanguageComplete}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-secondary text-primary font-semibold hover:bg-secondary/90 transition-colors text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader borderColor="#0E2E25" /> : "Create FAQ"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { AddFaqPopup };
