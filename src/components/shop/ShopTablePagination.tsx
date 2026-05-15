"use client";

import { ArrowLeftIcon, ArrowRightIcon, DownIcon } from "@/components/icons";

interface ShopTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (n: number) => void;
}

export function ShopTablePagination({
  currentPage,
  totalPages,
  totalRecords,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}: ShopTablePaginationProps) {
  // Compute visible record range
  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, totalRecords);

  // Build page numbers to show: always show first, last, current ±1, with ellipsis
  const pages = buildPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between p-4">
      {/* Left: Show X per page */}
      <div className="flex items-center gap-2">
        <span className="text-[13px] leading-[14px] font-semibold text-CarpeDiemGrey tracking-[-0.01em]">Show</span>
        <div className="relative">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="appearance-none border border-CarpeDiemBlueLight rounded-[6px] pl-[10px] pr-[28px] h-[30px] w-[55px] text-[11px] leading-[12px] font-normal text-CarpeDiemGreyDark bg-[#F9F9F9] focus:outline-none cursor-pointer"
            style={{ boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.05)' }}
          >
            {itemsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <DownIcon className="w-3 h-3 text-CarpeDiemSlate" />
          </div>
        </div>
        <span className="text-[13px] leading-[14px] font-semibold text-CarpeDiemGrey tracking-[-0.01em]">per page</span>
      </div>

      {/* Right: range + page buttons */}
      <div className="flex items-center gap-1">
        {/* Record range */}
        <span className="mr-4 text-[13px] leading-[14px] font-semibold text-CarpeDiemGrey tracking-[-0.01em]">
          {rangeStart}-{rangeEnd} of {totalRecords}
        </span>

        <div className="flex items-center overflow-hidden">
          {/* Prev arrow */}
          <PaginationArrow
            direction="left"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          />

          {/* Page numbers */}
          <div className="flex items-center">
            {pages.map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="w-[30px] h-[30px] flex items-center justify-center text-center text-CarpeDiemGrey">
                  …
                </span>
              ) : (
                <PageButton
                  key={p}
                  page={p as number}
                  isActive={p === currentPage}
                  onClick={() => onPageChange(p as number)}
                />
              )
            )}
          </div>

          {/* Next arrow */}
          <PaginationArrow
            direction="right"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Page number button ───────────────────────────────────────────────────────
function PageButton({
  page,
  isActive,
  onClick,
}: {
  page: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-[30px] h-[30px] rounded-[6px] flex items-center justify-center text-[14px] leading-[14px] transition-colors ${isActive
        ? "bg-CarpeDiemBlueLight text-CarpeDiemGreyDark font-semibold"
        : "text-CarpeDiemGrey font-normal hover:bg-CarpeDiemOffWhite"
        }`}
    >
      {page}
    </button>
  );
}

// ─── Arrow button ─────────────────────────────────────────────────────────────
function PaginationArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-[30px] h-[30px] flex items-center justify-center transition-colors ${disabled
        ? "text-[#C9CEDA] cursor-not-allowed"
        : "text-CarpeDiemGreyDark hover:bg-CarpeDiemOffWhite"
        }`}
      aria-label={direction === "left" ? "Previous page" : "Next page"}
    >
      {direction === "left" ? (
        <ArrowLeftIcon color={disabled ? "#C9CEDA" : "#4B545D"} />
      ) : (
        <ArrowRightIcon color={disabled ? "#C9CEDA" : "#4B545D"} />
      )}
    </button>
  );
}

// ─── Page number builder (with ellipsis logic) ────────────────────────────────
function buildPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [];

  // Always include 1
  pages.push(1);

  if (current > 3) pages.push("...");

  // Pages around current
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  // Always include last
  pages.push(total);

  return pages;
}