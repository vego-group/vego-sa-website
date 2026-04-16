"use client";

import { CheckCircle2 } from "lucide-react";

import type { TestDriveProductCardProps } from "@/interfaces";

function TestDriveProductCard({
  checked,
  option,
  className,
  ...props
}: TestDriveProductCardProps) {
  return (
    <div
      {...props}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border p-5 transition-all duration-300 ${
        checked
          ? "border-secondary bg-linear-to-br from-secondary/18 via-white to-primary/8 shadow-[0_18px_45px_-28px_rgba(27,217,137,0.9)]"
          : "border-slate-200 bg-white/90 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_18px_45px_-32px_rgba(15,23,42,0.45)]"
      } ${className ?? ""}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-secondary/60 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold tracking-tight text-primary">
            {option.name}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {option.tagline}
          </p>
        </div>
        <CheckCircle2
          className={`mt-1 size-5 shrink-0 transition ${
            checked
              ? "text-secondary"
              : "text-slate-300 group-hover:text-primary/40"
          }`}
        />
      </div>
    </div>
  );
}

export default TestDriveProductCard;
