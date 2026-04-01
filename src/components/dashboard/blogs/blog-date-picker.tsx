"use client";

import { cn } from "@/lib/utils";
import {
  addMonths,
  getDaysInMonth,
  format,
  isValid,
  parse,
  startOfMonth,
  subMonths,
} from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type BlogDatePickerProps = {
  value?: string | null; // ISO: "yyyy-MM-dd"
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const isoToDisplay = (iso?: string | null): string => {
  if (!iso) return "";
  const d = parse(iso, "yyyy-MM-dd", new Date());
  return isValid(d) && format(d, "yyyy-MM-dd") === iso
    ? format(d, "dd/MM/yyyy")
    : "";
};

const displayToDate = (display: string): Date | null => {
  if (display.length !== 10) return null;
  const d = parse(display, "dd/MM/yyyy", new Date());
  return isValid(d) && format(d, "dd/MM/yyyy") === display ? d : null;
};

const autoFormat = (raw: string, prev: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  let result = "";
  for (let i = 0; i < digits.length; i++) {
    if (i === 2 || i === 4) result += "/";
    result += digits[i];
  }
  const isDeleting = digits.length < prev.replace(/\D/g, "").length;
  if (!isDeleting && (result.length === 2 || result.length === 5))
    result += "/";
  return result;
};

// ─── Mini Calendar ────────────────────────────────────────────────────────────

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type CalendarProps = {
  selected: Date | null;
  onSelect: (date: Date) => void;
};

function Calendar({ selected, onSelect }: CalendarProps) {
  const [view, setView] = useState<Date>(
    selected && isValid(selected) ? selected : new Date(),
  );

  const year = view.getFullYear();
  const month = view.getMonth();

  const firstDay = startOfMonth(view).getDay();
  const totalDays = getDaysInMonth(view);
  const lastDayOfPrevMo = getDaysInMonth(subMonths(view, 1));

  const cells: { date: Date; current: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({
      date: new Date(year, month - 1, lastDayOfPrevMo - i),
      current: false,
    });
  for (let d = 1; d <= totalDays; d++)
    cells.push({ date: new Date(year, month, d), current: true });
  for (let d = 1; d <= 42 - cells.length; d++)
    cells.push({ date: new Date(year, month + 1, d), current: false });

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <div className="rounded-xl border border-primary/15 bg-background p-3 shadow-2xl w-64">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setView(subMonths(view, 1))}
          className="p-1 rounded-lg hover:bg-primary/10 transition text-primary/50 hover:text-primary"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" />
        </button>

        <span className="text-sm font-semibold text-primary select-none">
          {MONTHS[month]} {year}
        </span>

        <button
          type="button"
          onClick={() => setView(addMonths(view, 1))}
          className="p-1 rounded-lg hover:bg-primary/10 transition text-primary/50 hover:text-primary"
          aria-label="Next month"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-medium text-primary/30 py-0.5"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map(({ date, current }, i) => {
          const isSelected =
            selected && isValid(selected) && isSameDay(date, selected);
          const isToday = isSameDay(date, new Date());

          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                setView(date);
                onSelect(date);
              }}
              className={cn(
                "flex items-center justify-center h-7 w-full rounded-lg text-xs transition",
                !current && "text-primary/20",
                current &&
                  !isSelected &&
                  "text-primary/70 hover:bg-primary/10 hover:text-primary",
                isToday && !isSelected && "text-secondary font-bold",
                isSelected &&
                  "bg-secondary text-background font-bold shadow-md shadow-secondary/30",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Today shortcut */}
      <div className="mt-2 pt-2 border-t border-primary/10">
        <button
          type="button"
          onClick={() => {
            const t = new Date();
            setView(t);
            onSelect(t);
          }}
          className="w-full text-center text-xs text-secondary/60 hover:text-secondary transition"
        >
          Today
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function BlogDatePicker({
  value,
  onChange,
  className,
  placeholder = "DD/MM/YYYY",
}: BlogDatePickerProps) {
  const [inputValue, setInputValue] = useState(isoToDisplay(value));
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync when external `value` changes
  useEffect(() => {
    setInputValue(isoToDisplay(value));
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const handleInputChange = (raw: string) => {
    const formatted = autoFormat(raw, inputValue);
    setInputValue(formatted);
    const date = displayToDate(formatted);
    if (date) onChange(format(date, "yyyy-MM-dd"));
    else if (!formatted) onChange("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === "Tab")
      setOpen(false);
  };

  const handleCalendarSelect = (date: Date) => {
    setInputValue(format(date, "dd/MM/yyyy"));
    onChange(format(date, "yyyy-MM-dd"));
    setOpen(false);
  };

  // Decide direction before opening
  const handleToggle = () => {
    if (!open && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      // calendar height ~320px; open upward if not enough space below
      setOpenUpward(window.innerHeight - rect.bottom < 340);
    }
    setOpen((o) => !o);
  };

  const selectedDate = value ? displayToDate(isoToDisplay(value)) : null;

  return (
    <div ref={wrapperRef} className="relative w-full sm:max-w-xs">
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(false)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border border-white/20 bg-white/5",
            "px-3 py-2 pr-10 text-sm text-white placeholder:text-white/30",
            "outline-none transition",
            "focus:border-white/50 focus:ring-1 focus:ring-white/30",
            className,
          )}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={handleToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
          aria-label="Toggle calendar"
        >
          <CalendarDays className="size-4" />
        </button>
      </div>

      {/* Calendar popover — smart direction */}
      {open && (
        <div
          className={cn(
            "absolute left-0 z-50",
            openUpward ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          <Calendar selected={selectedDate} onSelect={handleCalendarSelect} />
        </div>
      )}
    </div>
  );
}

export { BlogDatePicker };
