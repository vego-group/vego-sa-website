"use client";

import {
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
  type LucideIcon,
} from "lucide-react";
import type { ReactElement } from "react";

import type { DepositFormFieldProps } from "@/interfaces/landing/deposit";

const icons: Record<DepositFormFieldProps["field"]["icon"], LucideIcon> = {
  user: User,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  "message-square": MessageSquare,
};

function DepositFormField({
  field,
  value,
  onChange,
}: DepositFormFieldProps): ReactElement {
  const Icon = icons[field.icon];
  const inputClassName =
    "w-full rounded-2xl border border-white/12 bg-white/6 px-5 py-4 text-white placeholder:text-white/32 transition focus:border-secondary/70 focus:bg-white/9";

  return (
    <label className="grid gap-3">
      <span className="flex items-center gap-2 text-sm font-bold text-white/86">
        {field.label}
        <span className="grid size-7 place-items-center rounded-full bg-secondary/15 text-secondary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </span>

      {field.type === "textarea" ? (
        <textarea
          value={value}
          rows={4}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClassName} min-h-32 resize-none`}
        />
      ) : (
        <input
          value={value}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={inputClassName}
        />
      )}
    </label>
  );
}

export default DepositFormField;
