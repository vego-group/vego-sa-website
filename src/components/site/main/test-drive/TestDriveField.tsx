"use client";

import Image from "next/image";

import InputErrorMessage from "@/components/ui/InputErrorMessage";
import type { TestDriveFieldProps } from "@/interfaces";

function TestDriveField({
  label,
  error,
  prefix,
  prefixIconSrc,
  prefixIconAlt,
  className,
  ...props
}: TestDriveFieldProps) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-semibold text-slate-700 text-start">
        {label}
      </span>
      <div className="group relative">
        {prefix ? (
          <span
            dir="ltr"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 inline-flex items-center gap-2 rounded-l-2xl border-r border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-500 transition-colors duration-300 group-focus-within:border-secondary group-focus-within:bg-secondary/10 group-focus-within:text-primary"
          >
            {prefixIconSrc ? (
              <Image
                src={prefixIconSrc}
                alt={prefixIconAlt ?? "Prefix icon"}
                width={20}
                height={14}
                className="h-3.5 w-5 rounded-[2px] object-cover"
              />
            ) : null}
            <span>{prefix}</span>
          </span>
        ) : null}
        <input
          {...props}
          className={`h-13 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-900 shadow-[0_8px_25px_-18px_rgba(15,23,42,0.4)] transition-all duration-300 placeholder:text-slate-400 focus:border-secondary focus:ring-4 focus:ring-secondary/15 focus:outline-none text-start ${prefix ? "pl-28" : ""} ${className ?? ""}`}
        />
      </div>
      <div className="mt-2 min-h-5">
        <InputErrorMessage msg={error} />
      </div>
    </label>
  );
}

export default TestDriveField;
