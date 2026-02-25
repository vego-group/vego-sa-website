"use client";

import Modal from "@/components/ui/modal";
import { useBlog } from "@/hooks/api";
import type { Blog } from "@/interfaces";
import { editBlogSchema, type EditBlogSchema } from "@/schemas";
import { updateBlogAPI } from "@/services/mutations/blogs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArabicBlogFields } from "./arabic-blog-fields";
import { CoverImageSection } from "./cover-image-section";
import { EnglishBlogFields } from "./english-blog-fields";
import { LanguageTabs } from "./language-tabs";
import { BlogEditLoadingSkeleton } from "./loading-skeleton";
import { ModalActions } from "./modal-actions";
import { PublishSettingsSection } from "./publish-settings-section";
import type { ActiveLanguage, BlogEditorPopupProps } from "./types";

function BlogEditorPopup({ isOpen, onClose, id }: BlogEditorPopupProps) {
  const queryClient = useQueryClient();
  const [activeLanguage, setActiveLanguage] = useState<ActiveLanguage>("en");
  const [selectedImage, setSelectedImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditBlogSchema>({
    resolver: zodResolver(editBlogSchema),
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
      cover_image: undefined,
    },
  });

  const { data, isLoading, isFetching } = useBlog(id, isOpen);
  const blog: Blog = data?.blog;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setImagePreview("");
    setSelectedImage(blog?.cover_image ?? "");
  }, [blog?.cover_image, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    reset({
      title_en: blog?.title?.en ?? "",
      title_ar: blog?.title?.ar ?? "",
      excerpt_en: blog?.excerpt?.en ?? "",
      excerpt_ar: blog?.excerpt?.ar ?? "",
      content_en: blog?.content?.en ?? "",
      content_ar: blog?.content?.ar ?? "",
      meta_title_en: blog?.meta_title?.en ?? "",
      meta_title_ar: blog?.meta_title?.ar ?? "",
      meta_description_en: blog?.meta_description?.en ?? "",
      meta_description_ar: blog?.meta_description?.ar ?? "",
      status:
        blog?.status === "publish" || blog?.status === "published"
          ? "publish"
          : "draft",
      cover_image: undefined,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [blog, isOpen, reset]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(String(reader.result ?? ""));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setSelectedImage("");
    setValue("cover_image", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: EditBlogSchema) => {
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

    const result = await updateBlogAPI(payload, id);
    if (!result?.ok) {
      toast.error(result?.message ?? "Could not update blog.");
      return;
    }

    toast.success(result?.message ?? "Blog updated successfully");
    onClose();
    await queryClient.invalidateQueries({
      queryKey: ["dashboard", "blogs"],
    });
  };

  const loading = isLoading || isFetching;
  const rawImageSrc = imagePreview || selectedImage || blog?.cover_image || "";
  const normalizedImageSrc =
    typeof rawImageSrc === "string" ? rawImageSrc.trim() : "";
  const imageSrc =
    normalizedImageSrc &&
    normalizedImageSrc !== "null" &&
    normalizedImageSrc !== "undefined"
      ? normalizedImageSrc
      : "";
  const coverImageRegister = register("cover_image");

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Edit Blog Post"
      titleClassName="text-xl sm:text-2xl font-semibold text-white"
      contentClassName="bg-linear-to-br from-emerald-950 via-primary to-emerald-950 sm:max-w-4xl"
      closeButtonClassname="text-white"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6"
      >
        <LanguageTabs
          activeLanguage={activeLanguage}
          onChange={setActiveLanguage}
        />

        {loading ? (
          <BlogEditLoadingSkeleton />
        ) : (
          <>
            <EnglishBlogFields
              blog={blog}
              activeLanguage={activeLanguage}
              register={register}
              errors={errors}
            />
            <ArabicBlogFields
              blog={blog}
              activeLanguage={activeLanguage}
              register={register}
              errors={errors}
            />
            <CoverImageSection
              id={id}
              fileInputRef={fileInputRef}
              imageSrc={imageSrc}
              imageValue={imagePreview || selectedImage}
              onImageUpload={(e) => {
                coverImageRegister.onChange(e);
                handleImageUpload(e);
              }}
              fileInputName={coverImageRegister.name}
              fileInputOnBlur={coverImageRegister.onBlur}
              fileInputRefRegister={coverImageRegister.ref}
              errorMessage={errors.cover_image?.message as string}
              onRemoveImage={handleRemoveImage}
            />
            <PublishSettingsSection
              blog={blog}
              register={register}
              errors={errors}
            />
          </>
        )}

        <ModalActions
          onClose={onClose}
          loading={loading}
          disabled={!blog}
          submitting={isSubmitting}
        />
      </form>
    </Modal>
  );
}

export { BlogEditorPopup };
