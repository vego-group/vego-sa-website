"use client";

import { useState } from "react";

import { SkeletonCard } from "@/components/skeleton/card";
import { PAGE_SIZE } from "@/constants";
import { useDashboardTestDriveRegistrations } from "@/hooks/api";

import { BlogsPagination } from "../blogs/blogs-pagination";
import { TestDriveDetailsPopup } from "./test-drive-details-popup";

type TestDriveTableProps = {
  searchQuery?: string;
};

type TestDriveApiItem = {
  id: number | string;
  name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  age?: number | null;
  gender?: string | null;
  product?: string | null;
  time_and_day?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

function getRows(payload: unknown): TestDriveApiItem[] {
  const response = payload as
    | {
        data?:
          | TestDriveApiItem[]
          | { data?: TestDriveApiItem[]; meta?: Record<string, unknown> };
        meta?: Record<string, unknown>;
      }
    | undefined;

  const dataNode = response?.data;

  if (Array.isArray(dataNode)) return dataNode;
  if (dataNode && !Array.isArray(dataNode) && Array.isArray(dataNode.data)) {
    return dataNode.data;
  }

  return [];
}

function getMeta(payload: unknown) {
  const response = payload as
    | {
        data?:
          | TestDriveApiItem[]
          | { data?: TestDriveApiItem[]; meta?: Record<string, unknown> };
        meta?: Record<string, unknown>;
      }
    | undefined;

  const dataNode = response?.data;

  if (dataNode && !Array.isArray(dataNode) && dataNode.meta) {
    return dataNode.meta;
  }

  return response?.meta;
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

function formatSlot(value?: string | null) {
  if (!value) return "N/A";

  const normalized = value.replace(" ", "T");
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getText(value?: string | number | null, fallback = "N/A") {
  if (typeof value === "number") return String(value);

  const normalized = value?.trim();
  return normalized ? normalized : fallback;
}

function formatPhoneNumber(value?: string | null) {
  const normalized = getText(value);

  if (normalized === "N/A") {
    return normalized;
  }

  return normalized.startsWith("+") ? normalized : `+${normalized}`;
}

function getGenderColor(gender?: string | null) {
  switch ((gender ?? "").toLowerCase()) {
    case "male":
      return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
    case "female":
      return "bg-pink-500/20 text-pink-300 border border-pink-500/30";
    default:
      return "bg-white/10 text-white/60 border border-white/10";
  }
}

function getProductColor(product?: string | null) {
  switch ((product ?? "").toLowerCase()) {
    case "vego 2030":
      return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    case "vg-26":
      return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
    case "vego-cem":
      return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
    case "vg-20":
      return "bg-violet-500/20 text-violet-300 border border-violet-500/30";
    case "vr-70":
      return "bg-rose-500/20 text-rose-300 border border-rose-500/30";
    default:
      return "bg-white/10 text-white/60 border border-white/10";
  }
}

function TestDriveTableContent({ searchQuery }: Required<TestDriveTableProps>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegistration, setSelectedRegistration] =
    useState<TestDriveApiItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { data, isLoading, isFetching } =
    useDashboardTestDriveRegistrations(currentPage);

  const registrations = getRows(data);
  const meta = getMeta(data) as
    | {
        current_page?: number | string;
        last_page?: number | string;
      }
    | undefined;

  const filteredRegistrations = registrations.filter((registration) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();

    return Boolean(
      [
        registration.name,
        registration.email,
        registration.phone_number,
        registration.product,
        registration.gender,
        String(registration.age ?? ""),
        registration.time_and_day,
      ].find((text) => (text ?? "").toLowerCase().includes(query)),
    );
  });

  const hasServerPagination = Boolean(meta?.last_page);
  const totalPages = hasServerPagination
    ? Number(meta?.last_page ?? 1)
    : Math.max(1, Math.ceil(filteredRegistrations.length / PAGE_SIZE));
  const activePage = hasServerPagination
    ? Number(meta?.current_page ?? 1)
    : currentPage;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visibleRegistrations = hasServerPagination
    ? filteredRegistrations
    : filteredRegistrations.slice(
        (currentPage - 1) * PAGE_SIZE,
        (currentPage - 1) * PAGE_SIZE + PAGE_SIZE,
      );

  const handleViewDetails = (id: TestDriveApiItem["id"]) => {
    const registration = registrations.find((item) => item.id === id);
    if (!registration) return;

    setSelectedRegistration(registration);
    setIsDetailsOpen(true);
  };

  if (isLoading) {
    return <SkeletonCard className="sm:h-100" />;
  }

  if (filteredRegistrations.length === 0) {
    return (
      <div className="px-4 py-12 text-center sm:py-16">
        <p className="text-base text-white/40 sm:text-lg">
          No test drive requests found
        </p>
        <p className="mt-2 text-xs text-white/20 sm:text-sm">
          Try changing the search query
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="divide-y divide-white/10 sm:hidden">
        {visibleRegistrations.map((registration) => (
          <div
            key={registration.id}
            className="cursor-pointer p-4 transition-colors hover:bg-white/5"
            onClick={() => handleViewDetails(registration.id)}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-white">
                  {getText(registration.name)}
                </h3>
                <span
                  className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-medium ${getProductColor(registration.product)}`}
                >
                  {getText(registration.product)}
                </span>
              </div>
              <span className="whitespace-nowrap text-xs text-white/50">
                {formatDate(registration.created_at)}
              </span>
            </div>

            <div className="mb-3 space-y-2">
              <p className="break-all text-xs text-white/80">
                {getText(registration.email)}
              </p>
              <p className="text-xs text-white/60">
                {formatPhoneNumber(registration.phone_number)}
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getGenderColor(registration.gender)}`}
                >
                  {getText(registration.gender)}
                </span>
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-white/70">
                  Age {getText(registration.age)}
                </span>
              </div>
              <p className="text-sm text-white/80">
                {formatSlot(registration.time_and_day)}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleViewDetails(registration.id);
                }}
                className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                title="View details"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto text-white/70 sm:block">
        <div className="min-w-220">
          <div className="grid grid-cols-12 gap-4 border-b border-white/10 px-6 py-4 text-xs font-medium uppercase tracking-wider text-white/50">
            <div className="col-span-2">Name</div>
            <div className="col-span-2">Contact Info</div>
            <div className="col-span-1">Age</div>
            <div className="col-span-1">Gender</div>
            <div className="col-span-2">Product</div>
            <div className="col-span-2">Preferred Slot</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          <div className="divide-y divide-white/10">
            {visibleRegistrations.map((registration) => (
              <div
                key={registration.id}
                className="grid cursor-pointer grid-cols-12 gap-4 px-6 py-5 transition-colors hover:bg-white/5"
                onClick={() => handleViewDetails(registration.id)}
              >
                <div className="col-span-2">
                  <h3
                    className="mb-1 truncate text-sm font-medium text-white"
                    title={getText(registration.name)}
                  >
                    {getText(registration.name)}
                  </h3>
                </div>

                <div className="col-span-2">
                  <p
                    className="mb-1 truncate text-sm text-white/80"
                    title={getText(registration.email)}
                  >
                    {getText(registration.email)}
                  </p>
                  <p
                    className="truncate text-xs text-white/50"
                    title={formatPhoneNumber(registration.phone_number)}
                  >
                    {formatPhoneNumber(registration.phone_number)}
                  </p>
                </div>

                <div className="col-span-1">
                  <span className="text-sm text-white/70">
                    {getText(registration.age)}
                  </span>
                </div>

                <div className="col-span-1">
                  <span
                    className={`inline-flex px-3 py-1.5 text-xs rounded-full font-medium ${getGenderColor(registration.gender)}`}
                  >
                    {getText(registration.gender)}
                  </span>
                </div>

                <div className="col-span-2">
                  <span
                    className={`inline-flex px-3 py-1.5 text-xs rounded-full font-medium ${getProductColor(registration.product)}`}
                  >
                    {getText(registration.product)}
                  </span>
                </div>

                <div className="col-span-2">
                  <span className="text-sm text-white/80">
                    {formatSlot(registration.time_and_day)}
                  </span>
                </div>

                <div className="col-span-1">
                  <span className="text-sm text-white/60">
                    {formatDate(registration.created_at)}
                  </span>
                </div>

                <div className="col-span-1 flex items-start justify-end gap-1">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleViewDetails(registration.id);
                    }}
                    className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                    title="View details"
                  >
                    <svg
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BlogsPagination
        pageNumbers={pageNumbers}
        activePage={activePage}
        totalPages={totalPages}
        isFetching={isFetching}
        onPageChange={setCurrentPage}
        onPrev={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
      />

      <TestDriveDetailsPopup
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedRegistration(null);
        }}
        registration={
          selectedRegistration
            ? {
                createdAt: formatDate(selectedRegistration.created_at),
                name: getText(selectedRegistration.name),
                email: getText(selectedRegistration.email),
                phoneNumber: formatPhoneNumber(
                  selectedRegistration.phone_number,
                ),
                age: selectedRegistration.age ?? null,
                gender: getText(selectedRegistration.gender),
                product: getText(selectedRegistration.product),
                preferredSlot: formatSlot(selectedRegistration.time_and_day),
              }
            : null
        }
      />
    </>
  );
}

function TestDriveTable({ searchQuery = "" }: TestDriveTableProps) {
  return <TestDriveTableContent key={searchQuery} searchQuery={searchQuery} />;
}

export { TestDriveTable };
