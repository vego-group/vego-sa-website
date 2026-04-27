"use client";

import { ChangeEvent, useRef } from "react";
import { useTranslations } from "next-intl";

interface FileUploadFieldProps {
  id: string;
  label: string;
  value?: File;
  onChange: (file: File | undefined) => void;
  error?: string;
  required?: boolean;
  helpText?: string;
  accept?: string;
}

export const FileUploadField = ({
  id,
  label,
  value,
  onChange,
  error,
  required,
  helpText,
  accept = "application/pdf,image/jpeg,image/png,image/jpg",
}: FileUploadFieldProps) => {
  const t = useTranslations("companiesRegister");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange(file);
  };

  const handleRemove = () => {
    onChange(undefined);
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`relative flex items-center gap-3 rounded-lg border-2 border-dashed bg-gray-50 px-4 py-3 transition-colors ${
          error
            ? "border-red-300"
            : value
            ? "border-green-300 bg-green-50"
            : "border-gray-300 hover:border-primary"
        }`}
      >
        <input
          id={id}
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-describedby={`${id}-help`}
        />

        <div className="pointer-events-none flex-1">
          {value ? (
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {value.name}
                </p>
                <p className="text-xs text-gray-500">{formatSize(value.size)}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-500">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-sm">{t("clickToUpload")}</span>
            </div>
          )}
        </div>

        {value && (
          <button
            type="button"
            onClick={handleRemove}
            className="relative z-10 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
          >
            {t("buttons.remove")}
          </button>
        )}
      </div>

      {helpText && !error && (
        <p id={`${id}-help`} className="mt-1 text-xs text-gray-500">
          {helpText}
        </p>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};