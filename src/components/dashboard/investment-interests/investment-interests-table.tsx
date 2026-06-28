"use client";

import { useState } from "react";

import { SkeletonCard } from "@/components/skeleton/card";
import { PAGE_SIZE } from "@/constants";
import { useInvestmentInterests } from "@/hooks/api/investment-interests";
import type { InvestmentInterest } from "@/interfaces";
import type { InvestmentInterestsResponse } from "@/types/dashboard/investment-interests";
import { BlogsPagination } from "../blogs/blogs-pagination";
import { DeleteInvestmentInterestConfirmationPopup } from "./delete-investment-interest-confirmation-popup";
import { InvestmentInterestDetailsPopup } from "./investment-interest-details-popup";
import {
  InvestmentInterestMobileRow,
  InvestmentInterestTableRow,
} from "./investment-interest-table-row";

type InvestmentInterestsTableProps = {
  searchQuery?: string;
};

function InvestmentInterestsTable({ searchQuery = "" }: InvestmentInterestsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<InvestmentInterest | null>(null);
  const [itemToDelete, setItemToDelete] = useState<InvestmentInterest | null>(null);
  const { data, isLoading, isFetching } = useInvestmentInterests(currentPage);
  const payload = data as InvestmentInterestsResponse | undefined;
  const rows = payload?.data ?? [];
  const filteredRows = filterRows(rows, searchQuery);
  const totalPages = Number(payload?.meta?.last_page ?? 1);
  const activePage = Number(payload?.meta?.current_page ?? currentPage);
  const pageNumbers = Array.from(
    { length: Math.max(1, totalPages || Math.ceil(filteredRows.length / PAGE_SIZE)) },
    (_, i) => i + 1,
  );

  if (isLoading) return <SkeletonCard className="sm:h-100" />;

  if (filteredRows.length === 0) {
    return (
      <div className="px-4 py-12 text-center sm:py-16">
        <p className="text-base text-white/40 sm:text-lg">
          No investment requests found
        </p>
        <p className="mt-2 text-xs text-white/20 sm:text-sm">
          Try changing the search query
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="block divide-y divide-white/10 sm:hidden">
        {filteredRows.map((item) => (
          <InvestmentInterestMobileRow
            key={item.id}
            item={item}
            onView={setSelectedItem}
            onDelete={setItemToDelete}
          />
        ))}
      </div>
      <div className="hidden overflow-x-auto text-white/70 sm:block">
        <div className="min-w-220">
          <div className="grid grid-cols-12 gap-4 border-b border-white/10 px-6 py-4 text-xs font-medium uppercase tracking-wider text-white/50">
            <div className="col-span-2">Name</div>
            <div className="col-span-2">Contact Info</div>
            <div className="col-span-3">Ticket Type</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>
          <div className="divide-y divide-white/10">
            {filteredRows.map((item) => (
              <InvestmentInterestTableRow
                key={item.id}
                item={item}
                onView={setSelectedItem}
                onDelete={setItemToDelete}
              />
            ))}
          </div>
        </div>
      </div>
      <BlogsPagination
        pageNumbers={pageNumbers}
        activePage={activePage}
        totalPages={pageNumbers.length}
        isFetching={isFetching}
        onPageChange={setCurrentPage}
        onPrev={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setCurrentPage((prev) => Math.min(pageNumbers.length, prev + 1))}
      />
      <InvestmentInterestDetailsPopup
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
      />
      <DeleteInvestmentInterestConfirmationPopup
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        id={itemToDelete?.id}
        itemLabel={itemToDelete?.full_name ?? itemToDelete?.email}
      />
    </>
  );
}

function filterRows(rows: InvestmentInterest[], searchQuery: string) {
  if (!searchQuery) return rows;
  const query = searchQuery.toLowerCase();

  return rows.filter((item) =>
    [item.full_name, item.email, item.phone_number, item.ticket_type].some((value) =>
      (value ?? "").toLowerCase().includes(query),
    ),
  );
}

export { InvestmentInterestsTable };
