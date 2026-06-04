"use client";

import { useState, useRef, useEffect } from "react";
import { PreOrdersHeader } from "./pre-orders-header";
import { PreOrdersStats } from "./pre-orders-stats";
import { PreOrdersTable } from "./pre-orders-table";
import { BlogDatePicker } from "@/components/dashboard/blogs/blog-date-picker";
import type { PreOrdersFilters } from "@/types/dashboard/pre-orders";

// ─── Custom Dropdown ─────────────────────────────────────────────────────────

type SelectOption = { value: string; label: string };

type FilterSelectProps = {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder: string;
};

function FilterSelect({ value, onChange, options, placeholder }: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all whitespace-nowrap"
      >
        <span>{selected?.label ?? placeholder}</span>
        <svg
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 min-w-full bg-linear-to-b from-primary to-[#060e28] border border-white/10 rounded-xl shadow-2xl shadow-black/60 overflow-hidden">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => { onChange(option.value); setOpen(false); }}
                className={`flex items-center justify-between w-full px-4 py-2.5 text-sm text-left transition-colors
                  ${isSelected ? "text-white bg-white/10" : "text-white/70 hover:text-white hover:bg-white/5"}`}
              >
                {option.label}
                {isSelected && (
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Options ─────────────────────────────────────────────────────────────────

const ORDER_STATUS_OPTIONS: SelectOption[] = [
  { value: "", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
];

const PAYMENT_STATUS_OPTIONS: SelectOption[] = [
  { value: "", label: "All Payments" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

const SORT_OPTIONS: SelectOption[] = [
  { value: "desc", label: "Newest First" },
  { value: "asc", label: "Oldest First" },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

function PreOrdersContent() {
  const [filters, setFilters] = useState<PreOrdersFilters>({});

  const update = <K extends keyof PreOrdersFilters>(
    key: K,
    value: PreOrdersFilters[K] | "",
  ) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (value) {
        next[key] = value as PreOrdersFilters[K];
      } else {
        delete next[key];
      }
      return next;
    });
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8">
      <PreOrdersHeader />
      <PreOrdersStats />

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2.5 items-center">
        <FilterSelect
          value={filters.status ?? ""}
          onChange={(v) => update("status", v as PreOrdersFilters["status"] | "")}
          options={ORDER_STATUS_OPTIONS}
          placeholder="All Statuses"
        />

        <FilterSelect
          value={filters.payment_status ?? ""}
          onChange={(v) => update("payment_status", v as PreOrdersFilters["payment_status"] | "")}
          options={PAYMENT_STATUS_OPTIONS}
          placeholder="All Payments"
        />

        <div className="w-36 shrink-0">
          <BlogDatePicker
            value={filters.from_date ?? ""}
            onChange={(v) => update("from_date", v)}
            placeholder="From date"
            className="h-10 py-0!"
          />
        </div>

        <div className="w-36 shrink-0">
          <BlogDatePicker
            value={filters.to_date ?? ""}
            onChange={(v) => update("to_date", v)}
            placeholder="To date"
            className="h-10 py-0!"
          />
        </div>

        <FilterSelect
          value={filters.sort ?? "desc"}
          onChange={(v) => update("sort", v as PreOrdersFilters["sort"])}
          options={SORT_OPTIONS}
          placeholder="Newest First"
        />

        {activeCount > 0 && (
          <button
            onClick={() => setFilters({})}
            className="flex items-center gap-1.5 h-10 px-3.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-white text-[10px] font-bold">
              {activeCount}
            </span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden">
        <PreOrdersTable filters={filters} />
      </div>
    </div>
  );
}

export { PreOrdersContent };
