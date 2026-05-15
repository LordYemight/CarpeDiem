
"use client";

import { useState } from "react";
import { ShopTableRow } from "./ShopTableRow";
import { ShopTablePagination } from "./ShopTablePagination";
import { ShopFilters } from "./ShopFilters";
import type { FabJob, ShopFilters as ShopFiltersType } from "@/types/shop";

import { MOCK_JOBS } from "@/lib/constants/jobs";

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];
const TOTAL_RECORDS = 52; // from the "1-10 of 52" shown in screenshot

import { SortIcon } from "@/components/icons";
import { SortDirection } from "@/types/shop";

interface SortState {
    column: string | null;
    direction: SortDirection;
}

export function ShopTable() {
    const [filters, setFilters] = useState<ShopFiltersType>({
        search: "",
        dateRange: { from: "2025-06-02", to: "2025-06-09" },
        fabType: null,
        salesPerson: null,
    });
    const [currentPage, setCurrentPage] = useState(2); // matches screenshot (page 2 active)
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sort, setSort] = useState<SortState>({ column: null, direction: null });
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const totalPages = Math.ceil(TOTAL_RECORDS / itemsPerPage);

    const handleSort = (column: string) => {
        setSort((prev) => ({
            column,
            direction:
                prev.column === column
                    ? prev.direction === "asc"
                        ? "desc"
                        : prev.direction === "desc"
                            ? null
                            : "asc"
                    : "asc",
        }));
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === MOCK_JOBS.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(MOCK_JOBS.map((j) => j.id)));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <div className="flex flex-col rounded-[12px] border border-CarpeDiemBlueLight">
            {/* Filters row */}
            <ShopFilters filters={filters} onChange={setFilters} />

            {/* Date group header */}
            <div className="h-10 mb-2 bg-CarpeDiemTableHeader text-CarpeDiemGreyDark text-[15px] font-normal px-[14px] flex items-center tracking-wider">
                08 October, 2025
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white border-l border-r border-t border-CarpeDiemBlueLight custom-scrollbar">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="h-10 border-b border-CarpeDiemBlueLight bg-CarpeDiemWhiteSoft">
                            {/* Checkbox */}
                            <th className="w-10 px-[14px] border-r border-CarpeDiemBlueLight">
                                <input
                                    type="checkbox"
                                    className="w-[18px] h-[18px] rounded border-gray-300 accent-CarpeDiemGreen cursor-pointer"
                                    checked={selectedIds.size === MOCK_JOBS.length && MOCK_JOBS.length > 0}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <SortableHeader label="FAB TYPE" column="fabType" sort={sort} onSort={handleSort} />
                            <SortableHeader label="FAB ID" column="fabId" sort={sort} onSort={handleSort} />
                            <SortableHeader label="JOB NO." column="jobNo" sort={sort} onSort={handleSort} />
                            <th className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGrey whitespace-nowrap [font-variant:small-caps] tracking-wide border-r border-CarpeDiemBlueLight">
                                NO. OF PIECES
                            </th>
                            <th className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGrey whitespace-nowrap [font-variant:small-caps] tracking-wide border-r border-CarpeDiemBlueLight">
                                TOTAL SQ FT
                            </th>
                            <th className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGrey whitespace-nowrap [font-variant:small-caps] tracking-wide border-r border-CarpeDiemBlueLight">
                                WJ TIME (MINUTES)
                            </th>
                            <th className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGrey [font-variant:small-caps] tracking-wide border-r border-CarpeDiemBlueLight">
                                CONFIRMED
                            </th>
                            <th className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGrey [font-variant:small-caps] tracking-wide border-r border-CarpeDiemBlueLight">
                                REVENUE
                            </th>
                            <th className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGrey [font-variant:small-caps] tracking-wide border-r border-CarpeDiemBlueLight">
                                GP
                            </th>
                            <th className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGrey whitespace-nowrap [font-variant:small-caps] tracking-wide border-r border-CarpeDiemBlueLight">
                                FP COMPLETE
                            </th>
                            {/* Actions column — no header */}
                            <th className="w-10" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-CarpeDiemBlueLight">
                        {MOCK_JOBS.map((job, index) => (
                            <ShopTableRow
                                key={job.id}
                                job={job}
                                selected={selectedIds.has(job.id)}
                                onSelect={() => toggleSelect(job.id)}
                                isLastRow={index === MOCK_JOBS.length - 1}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <ShopTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalRecords={TOTAL_RECORDS}
                itemsPerPage={itemsPerPage}
                itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(n) => {
                    setItemsPerPage(n);
                    setCurrentPage(1);
                }}
            />
        </div>
    );
}

// ─── Sortable column header ───────────────────────────────────────────────────
function SortableHeader({
    label,
    column,
    sort,
    onSort,
}: {
    label: string;
    column: string;
    sort: SortState;
    onSort: (col: string) => void;
}) {
    const isActive = sort.column === column;
    return (
        <th
            className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGrey whitespace-nowrap cursor-pointer select-none group [font-variant:small-caps] tracking-wide border-r border-CarpeDiemBlueLight"
            onClick={() => onSort(column)}
        >
            <span className="inline-flex items-center gap-1">
                {label}
                <SortIcon />
            </span>
        </th>
    );
}