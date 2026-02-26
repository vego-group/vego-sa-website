"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { contactSchema, type ContactSchema } from "@/schemas";
import { contactAPI } from "@/services/mutations/contact";
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import Loader from "@/components/ui/loader";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const currentLocale = locale === "ar" ? "ar" : "en";
  const isArabic = currentLocale === "ar";
  const getValidationMsg = (msg?: string) => (msg ? t(msg as never) : undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      locale: currentLocale,
    },
    mode: "onChange",
  });

  const subjects = [
    { value: "general", label: t("subjects.general") },
    { value: "products", label: t("subjects.products") },
    { value: "partnership", label: t("subjects.partnership") },
    { value: "support", label: t("subjects.support") },
    { value: "jobs", label: t("subjects.jobs") },
  ];

  const onSubmit = async (data: ContactSchema) => {
    const result = await contactAPI(data);

    if (result?.ok) {
      toast.success(result?.message || "Message sent successfully");
      reset({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        locale: currentLocale,
      });
      return;
    }

    toast.error(result?.message || "Failed to send message");
  };

  return (
    <section>
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Decorative gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-br from-primary/20 via-secondary/20 to-transparent" />

          <div
            className="relative p-8 sm:p-6"
            dir={isArabic ? "rtl" : "ltr"}
          >
            {/* Header */}
            <div className={`mb-10 ${isArabic ? "text-right" : "text-left"}`}>
              <div
                className="mb-4 flex items-center gap-4"
              >
                <div className="rounded-xl bg-linear-to-br from-primary to-secondary p-3 shadow-md">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-primary">
                  {t("title")}
                </h3>
              </div>
              <p
                className={`text-base leading-relaxed text-slate-600 ${
                  isArabic ? "mr-0 ml-auto max-w-xl" : "max-w-xl"
                }`}
              >
                {t("description")}
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              dir={isArabic ? "rtl" : "ltr"}
            >
              <input type="hidden" {...register("locale")} />

              {/* Name & Email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder={t("name")}
                    {...register("name")}
                    className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  />
                  <div className="mt-2">
                    <InputErrorMessage msg={getValidationMsg(errors.name?.message)} />
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={t("email")}
                    {...register("email")}
                    className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  />
                  <div className="mt-2">
                    <InputErrorMessage msg={getValidationMsg(errors.email?.message)} />
                  </div>
                </div>
              </div>

              {/* Phone & Subject */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <input
                    type="tel"
                    placeholder={t("phone")}
                    {...register("phone")}
                    className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40 ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  />
                  <div className="mt-2">
                    <InputErrorMessage msg={getValidationMsg(errors.phone?.message)} />
                  </div>
                </div>
                <div>
                  <select
                    {...register("subject")}
                    className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40 ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    <option value="">{t("subjectPlaceholder")}</option>
                    {subjects.map((subject) => (
                      <option key={subject.value} value={subject.value}>
                        {subject.label}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2">
                    <InputErrorMessage msg={getValidationMsg(errors.subject?.message)} />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  rows={5}
                  placeholder={t("message")}
                  {...register("message")}
                  className={`w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                />
                <div className="mt-2">
                  <InputErrorMessage msg={getValidationMsg(errors.message?.message)} />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-4 w-full rounded-xl bg-linear-to-r from-primary to-secondary py-4 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
              >
                {isSubmitting ? <Loader /> : t("submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
