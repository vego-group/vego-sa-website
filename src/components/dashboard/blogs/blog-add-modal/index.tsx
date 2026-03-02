"use client";

import InputErrorMessage from "@/components/ui/InputErrorMessage";
import Loader from "@/components/ui/loader";
import Modal from "@/components/ui/modal";
import { addBlogSchema, type AddBlogSchema } from "@/schemas";
import { addBlogAPI } from "@/services/mutations/blogs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ActiveLanguage = "en" | "ar";

type AddBlogPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const baseInputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none";

const baseTextAreaClassName = `${baseInputClassName} resize-none`;

function AddBlogPopup({ isOpen, onClose }: AddBlogPopupProps) {
  const queryClient = useQueryClient();
  const [activeLanguage, setActiveLanguage] = useState<ActiveLanguage>("en");
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddBlogSchema>({
    resolver: zodResolver(addBlogSchema),
    mode: "onChange",
    defaultValues: {
      title_en: "",
      title_ar: "",
      excerpt_en: "",
      excerpt_ar: "",
      content_en: "",
      content_ar: "",
      meta_title_en: "",
      meta_title_ar: "",
      meta_description_en: "",
      meta_description_ar: "",
      status: "draft",
    },
  });

  useEffect(() => {
    if (isOpen) return;
    setActiveLanguage("en");
    setImagePreview("");
    reset({
      title_en: "",
      title_ar: "",
      excerpt_en: "",
      excerpt_ar: "",
      content_en: "",
      content_ar: "",
      meta_title_en: "",
      meta_title_ar: "",
      meta_description_en: "",
      meta_description_ar: "",
      status: "draft",
      cover_image: undefined,
    });
  }, [isOpen, reset]);

  const coverImageRegister = register("cover_image");
  const watchedValues = watch();
  const englishFieldKeys: (keyof AddBlogSchema)[] = [
    "title_en",
    "excerpt_en",
    "content_en",
    "meta_title_en",
    "meta_description_en",
  ];
  const arabicFieldKeys: (keyof AddBlogSchema)[] = [
    "title_ar",
    "excerpt_ar",
    "content_ar",
    "meta_title_ar",
    "meta_description_ar",
  ];

  const hasValue = (value: unknown) =>
    typeof value === "string" ? value.trim().length > 0 : false;

  const isEnglishComplete = englishFieldKeys.every((key) =>
    hasValue(watchedValues[key]),
  );
  const isArabicComplete = arabicFieldKeys.every((key) =>
    hasValue(watchedValues[key]),
  );
  const hasCoverImage =
    !!watchedValues.cover_image &&
    typeof watchedValues.cover_image === "object" &&
    "length" in watchedValues.cover_image &&
    Number(watchedValues.cover_image.length) > 0;

  const isCurrentLanguageComplete =
    activeLanguage === "en" ? isEnglishComplete : isArabicComplete;
  const isSubmitDisabled =
    isSubmitting || !isCurrentLanguageComplete || !hasCoverImage;

  const handleClose = () => {
    onClose();
  };

  const hasAnyFieldError = (
    formErrors: FieldErrors<AddBlogSchema>,
    keys: (keyof AddBlogSchema)[],
  ) => keys.some((key) => Boolean(formErrors[key]));

  const onInvalidSubmit = (formErrors: FieldErrors<AddBlogSchema>) => {
    const currentLanguage = activeLanguage;
    const oppositeLanguage = currentLanguage === "en" ? "ar" : "en";

    const currentLanguageKeys =
      currentLanguage === "en" ? englishFieldKeys : arabicFieldKeys;
    const oppositeLanguageKeys =
      oppositeLanguage === "en" ? englishFieldKeys : arabicFieldKeys;

    // If the hidden language version is missing/invalid, take the user there first.
    if (hasAnyFieldError(formErrors, oppositeLanguageKeys)) {
      setActiveLanguage(oppositeLanguage);
      return;
    }

    if (hasAnyFieldError(formErrors, currentLanguageKeys)) {
      setActiveLanguage(currentLanguage);
    }
  };

  const onSubmit = async (data: AddBlogSchema) => {
    const payload = new FormData();

    payload.append("title_en", data.title_en);
    payload.append("title_ar", data.title_ar);
    payload.append("excerpt_en", data.excerpt_en);
    payload.append("excerpt_ar", data.excerpt_ar);
    payload.append("content_en", data.content_en);
    payload.append("content_ar", data.content_ar);
    payload.append("meta_title_en", data.meta_title_en);
    payload.append("meta_title_ar", data.meta_title_ar);
    payload.append("meta_description_en", data.meta_description_en);
    payload.append("meta_description_ar", data.meta_description_ar);
    payload.append("status", data.status);

    const coverImageFile = data.cover_image?.[0];
    if (coverImageFile) {
      payload.append("cover_image", coverImageFile);
    }

    const result = await addBlogAPI(payload);
    if (!result?.ok) {
      toast.error(result?.message ?? "Could not create blog.");
      return;
    }

    toast.success(result?.message ?? "Blog created successfully");
    handleClose();
    await queryClient.invalidateQueries({
      queryKey: ["dashboard", "blogs"],
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title="Create Blog Post"
      titleClassName="text-xl sm:text-2xl font-semibold text-white"
      contentClassName="bg-linear-to-br from-emerald-950 via-primary to-emerald-950 sm:max-w-4xl"
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
          className={`space-y-4 sm:space-y-6 ${activeLanguage === "en" ? "block" : "hidden"}`}
        >
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
              Blog Title (EN) <span className="text-red-400">*</span>
            </label>
            <input
              {...register("title_en")}
              className={baseInputClassName}
              dir="ltr"
              placeholder="Title"
            />
            <InputErrorMessage msg={errors.title_en?.message} />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
              Excerpt (EN) <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("excerpt_en")}
              rows={3}
              className={baseTextAreaClassName}
              dir="ltr"
              placeholder="Short excerpt"
            />
            <InputErrorMessage msg={errors.excerpt_en?.message} />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
              Content (EN) <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("content_en")}
              rows={6}
              className={`${baseTextAreaClassName} font-mono`}
              dir="ltr"
              placeholder="Blog content"
            />
            <InputErrorMessage msg={errors.content_en?.message} />
          </div>

          <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
            <h4 className="text-sm sm:text-base font-medium text-white">
              SEO Settings (English)
            </h4>

            <div>
              <input
                {...register("meta_title_en")}
                className={baseInputClassName}
                dir="ltr"
                placeholder="Meta title"
              />
              <InputErrorMessage msg={errors.meta_title_en?.message} />
            </div>

            <div>
              <textarea
                {...register("meta_description_en")}
                rows={2}
                className={baseTextAreaClassName}
                dir="ltr"
                placeholder="Meta description"
              />
              <InputErrorMessage msg={errors.meta_description_en?.message} />
            </div>
          </div>
        </div>

        <div
          className={`space-y-4 sm:space-y-6 ${activeLanguage === "ar" ? "block" : "hidden"}`}
          dir="rtl"
        >
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2 text-right">
              عنوان المقال <span className="text-red-400">*</span>
            </label>
            <input
              {...register("title_ar")}
              className={`${baseInputClassName} text-right`}
              dir="rtl"
              placeholder="عنوان"
            />
            <InputErrorMessage msg={errors.title_ar?.message} />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2 text-right">
              الملخص <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("excerpt_ar")}
              rows={3}
              className={`${baseTextAreaClassName} text-right`}
              dir="rtl"
              placeholder="خلاصة"
            />
            <InputErrorMessage msg={errors.excerpt_ar?.message} />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2 text-right">
              المحتوى <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("content_ar")}
              rows={6}
              className={`${baseTextAreaClassName} font-mono text-right`}
              dir="rtl"
              placeholder="المحتوى"
            />
            <InputErrorMessage msg={errors.content_ar?.message} />
          </div>

          <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
            <h4 className="text-sm sm:text-base font-medium text-white text-right">
              إعدادات SEO (Arabic)
            </h4>

            <div>
              <input
                {...register("meta_title_ar")}
                className={`${baseInputClassName} text-right`}
                dir="rtl"
                placeholder="عنوان ميتا"
              />
              <InputErrorMessage msg={errors.meta_title_ar?.message} />
            </div>

            <div>
              <textarea
                {...register("meta_description_ar")}
                rows={2}
                className={`${baseTextAreaClassName} text-right`}
                dir="rtl"
                placeholder="وصف ميتا"
              />
              <InputErrorMessage msg={errors.meta_description_ar?.message} />
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
          <h3 className="text-base sm:text-lg font-medium text-white">
            Cover Image
          </h3>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col items-center justify-center w-full">
              <label
                htmlFor="add-blog-cover-image"
                className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
              >
                <div className="flex flex-col items-center justify-center px-4 py-3 sm:py-5">
                  <p className="text-xs sm:text-sm text-white/60 text-center">
                    <span className="font-semibold">Click to upload</span>
                    <span className="hidden sm:inline"> or drag and drop</span>
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    PNG, JPG, JPEG, GIF (Max 5MB)
                  </p>
                </div>
                <input
                  id="add-blog-cover-image"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/gif"
                  className="hidden"
                  name={coverImageRegister.name}
                  ref={coverImageRegister.ref}
                  onBlur={coverImageRegister.onBlur}
                  onChange={(event) => {
                    coverImageRegister.onChange(event);
                    const file = event.target.files?.[0];
                    if (!file) {
                      setImagePreview("");
                      return;
                    }

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImagePreview(String(reader.result ?? ""));
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
              <InputErrorMessage msg={errors.cover_image?.message as string} />
            </div>

            <div className="relative rounded-xl overflow-hidden border border-white/10">
              <div className="relative w-full h-32 sm:h-40 md:h-48 bg-white/5">
                <Image
                  src={imagePreview || "/images/placeholder-image.svg"}
                  alt="Cover preview"
                  className={
                    imagePreview
                      ? "object-cover"
                      : "object-contain p-4 brightness-0 invert opacity-35"
                  }
                  fill
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
          <h3 className="text-base sm:text-lg font-medium text-white">
            Publish Settings
          </h3>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full sm:max-w-xs rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-sm text-white focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
            >
              <option value="draft" className="bg-primary">
                Save as Draft
              </option>
              <option value="publish" className="bg-primary">
                Publish Now
              </option>
            </select>
            <InputErrorMessage msg={errors.status?.message} />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 -mb-3 pb-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-secondary text-primary font-semibold hover:bg-secondary/90 transition-colors text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader borderColor="#0E2E25" /> : "Create Blog"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { AddBlogPopup };
