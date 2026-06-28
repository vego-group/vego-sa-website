"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TicketTypeDropdownProps = {
  value?: string;
  placeholder: string;
  isArabic: boolean;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
};

function TicketTypeDropdown({
  value,
  placeholder,
  isArabic,
  options,
  onChange,
}: TicketTypeDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleScroll() {
      setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`${inputClassName(isArabic)} flex items-center justify-between gap-3`}
      >
        <span className={selectedOption ? "text-slate-800" : "text-slate-400"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-slate-600 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-sm text-slate-700 transition hover:bg-primary hover:text-white sm:py-3 ${
                isArabic ? "text-right" : "text-left"
              } ${option.value === value ? "bg-primary text-white" : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function inputClassName(isArabic: boolean) {
  return `w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 shadow-inner transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 ${
    isArabic ? "text-right" : "text-left"
  }`;
}

export default TicketTypeDropdown;
