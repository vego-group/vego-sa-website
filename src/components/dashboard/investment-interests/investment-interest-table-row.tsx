"use client";

import { Eye, Trash2 } from "lucide-react";

import type { InvestmentInterest } from "@/interfaces";

type InvestmentInterestTableRowProps = {
  item: InvestmentInterest;
  onView: (item: InvestmentInterest) => void;
  onDelete: (item: InvestmentInterest) => void;
};

function InvestmentInterestTableRow({
  item,
  onView,
  onDelete,
}: InvestmentInterestTableRowProps) {
  return (
    <div
      className="grid cursor-pointer grid-cols-12 gap-4 px-6 py-5 transition-colors hover:bg-white/5"
      onClick={() => onView(item)}
    >
      <div className="col-span-2">
        <p className="truncate text-sm font-medium text-white" title={item.full_name}>
          {getText(item.full_name)}
        </p>
      </div>
      <div className="col-span-2">
        <p className="truncate text-sm text-white/80" title={item.phone_number}>
          {getText(item.phone_number)}
        </p>
        <p className="truncate text-xs text-white/50" title={item.email ?? undefined}>
          {getText(item.email)}
        </p>
      </div>
      <div className="col-span-3">
        <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/20 px-3 py-1.5 text-xs font-medium text-cyan-300">
          {getText(item.ticket_type)}
        </span>
      </div>
      <div className="col-span-2">
        <span className="text-sm text-white/60">{formatDate(item.created_at)}</span>
      </div>
      <div className="col-span-3 flex items-start justify-end gap-1">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onView(item);
          }}
          className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          title="View details"
        >
          <Eye className="size-4" />
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            onDelete(item);
          }}
          className="rounded-lg p-2 text-white/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
          title="Delete investment request"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}

function InvestmentInterestMobileRow({
  item,
  onView,
  onDelete,
}: InvestmentInterestTableRowProps) {
  return (
    <div className="p-4 transition-colors hover:bg-white/5" onClick={() => onView(item)}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium text-white">
            {getText(item.full_name)}
          </h3>
          <p className="mt-1 text-xs text-white/60">{getText(item.phone_number)}</p>
        </div>
        <span className="text-xs text-white/50">{formatDate(item.created_at)}</span>
      </div>
      <p className="mb-3 break-all text-xs text-white/70">{getText(item.email)}</p>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/20 px-2 py-1 text-xs font-medium text-cyan-300">
          {getText(item.ticket_type)}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onView(item);
            }}
            className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
            title="View details"
          >
            <Eye className="size-4" />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onDelete(item);
            }}
            className="rounded-lg p-2 text-white/60 hover:bg-red-500/10 hover:text-red-400"
            title="Delete investment request"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function getText(value?: string | null, fallback = "N/A") {
  const normalized = value?.trim();
  return normalized ? normalized : fallback;
}

function formatDate(value?: string | null) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export { InvestmentInterestMobileRow, InvestmentInterestTableRow };
