"use client";

import {
  ChevronDown,
  Check,
  Mail,
  MapPin,
  Phone,
  User,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import type { ChangeEvent, ReactElement } from "react";

import type { DepositFormFieldProps } from "@/interfaces/landing/deposit";
import InputErrorMessage from "@/components/ui/InputErrorMessage";

const icons: Record<DepositFormFieldProps["field"]["icon"], LucideIcon> = {
  user: User,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
};

function DepositFormField({
  field,
  control,
  error,
  register,
}: DepositFormFieldProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const Icon = icons[field.icon];
  const inputClassName =
    "w-full rounded-2xl border border-white/12 bg-white/6 px-5 py-4 text-white placeholder:text-white/32 transition focus:border-secondary/70 focus:bg-white/9";
  const phoneInputClassName =
    "h-14 w-full rounded-r-2xl border border-l-0 border-white/12 bg-white/6 px-5 text-white placeholder:text-white/32 transition focus:border-secondary/70 focus:bg-white/9 focus:outline-none";
  const registration = register(field.id);

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.value = event.currentTarget.value
      .replace(/\D/g, "")
      .slice(0, 9);
    void registration.onChange(event);
  };

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <label className="grid gap-3">
      <span className="flex items-center gap-2 text-sm font-bold text-white/86">
        <span className="grid size-7 place-items-center rounded-full bg-secondary/15 text-secondary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        {field.label}
      </span>

      {field.id === "phone" ? (
        <div dir="ltr" className="flex h-14 overflow-hidden rounded-2xl">
          <span className="inline-flex shrink-0 items-center gap-3 rounded-l-2xl border border-white/12 bg-secondary/10 px-4 text-sm font-bold text-white">
            <Image
              src="/images/flag.png"
              alt=""
              width={24}
              height={16}
              className="h-4 w-6 rounded-[2px] object-cover"
              aria-hidden="true"
            />
            <span>+966</span>
          </span>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={9}
            aria-invalid={Boolean(error)}
            placeholder="5X XXX XXXX"
            {...registration}
            onChange={handlePhoneChange}
            className={phoneInputClassName}
          />
        </div>
      ) : field.type === "select" ? (
        <Controller
          control={control}
          name={field.id}
          render={({ field: controllerField }) => (
            <div ref={dropdownRef} className="relative" dir="rtl">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={listboxId}
                onClick={() => setIsOpen((current) => !current)}
                className={`flex h-14 w-full items-center justify-between gap-4 rounded-2xl border px-5 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-secondary/15 ${
                  error
                    ? "border-red-400 bg-red-500/10 text-white"
                    : "border-white/12 bg-white/6 text-white hover:border-secondary/60 hover:bg-white/10"
                }`}
              >
                <span
                  className={
                    controllerField.value ? "text-white" : "text-white/42"
                  }
                >
                  {controllerField.value || field.placeholder}
                </span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary/15 text-secondary">
                  <ChevronDown
                    className={`size-5 transition ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </span>
              </button>

              {isOpen ? (
                <div className="absolute right-0 top-[calc(100%+0.75rem)] z-30 w-full overflow-hidden rounded-2xl border border-white/14 bg-[#07172b]/95 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl">
                  <div
                    id={listboxId}
                    role="listbox"
                    tabIndex={-1}
                    className="max-h-34 md:max-h-40 overflow-y-auto p-2"
                  >
                    {field.options?.map((option) => {
                      const isSelected = controllerField.value === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            controllerField.onChange(option);
                            setIsOpen(false);
                          }}
                          className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                            isSelected
                              ? "bg-secondary text-primary"
                              : "text-white/82 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span>{option}</span>
                          {isSelected ? (
                            <Check className="size-4" aria-hidden="true" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        />
      ) : (
        <input
          type={field.type}
          aria-invalid={Boolean(error)}
          placeholder={field.placeholder}
          {...registration}
          className={inputClassName}
        />
      )}

      <InputErrorMessage msg={error} />
    </label>
  );
}

export default DepositFormField;
