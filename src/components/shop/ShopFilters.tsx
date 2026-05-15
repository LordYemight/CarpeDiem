"use client";

import { useState } from "react";
import type { ShopFilters as ShopFiltersType } from "@/types/shop";
import { SearchInput, DateRangePicker } from "@/components/ui";
import { DownIcon } from "@/components/icons";

import { FAB_TYPES } from "@/lib/constants/fabTypes";

const SALES_PERSONS = ["Alice Johnson", "Bob Smith", "Carol White"] as const;

interface ShopFiltersProps {
    filters: ShopFiltersType;
    onChange: (filters: ShopFiltersType) => void;
}

export function ShopFilters({ filters, onChange }: ShopFiltersProps) {
    const [fabOpen, setFabOpen] = useState(false);
    const [salesOpen, setSalesOpen] = useState(false);

    const update = (partial: Partial<ShopFiltersType>) =>
        onChange({ ...filters, ...partial });

    const handleExportCSV = () => {
        console.log("Exporting CSV...");
    };

    const filterShadow = { boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.05)' };

    return (
        <div className="flex flex-wrap items-center gap-2 p-4">
            {/* Search */}
            <SearchInput
                value={filters.search}
                onChange={(val) => update({ search: val })}
                placeholder="Search by job, Fab ID"
                width="230px"
                height="34px"
                style={{ padding: '10px 12px', ...filterShadow }}
            />

            {/* Date range picker */}
            <DateRangePicker
                startDate={filters.dateRange.from}
                endDate={filters.dateRange.to}
                onDateRangeChange={(from, to) => update({ dateRange: { from, to } })}
                style={filterShadow}
            />

            {/* FAB type dropdown */}
            <FilterDropdown
                label="FAB type"
                value={filters.fabType}
                options={FAB_TYPES as unknown as string[]}
                isOpen={fabOpen}
                onToggle={() => { setFabOpen((o) => !o); setSalesOpen(false); }}
                onSelect={(v) => { update({ fabType: v }); setFabOpen(false); }}
                onClear={() => { update({ fabType: null }); setFabOpen(false); }}
                width="114px"
                style={filterShadow}
            />

            {/* Spacer pushes sales + export to right */}
            <div className="flex-1" />

            {/* Salesperson dropdown */}
            <FilterDropdown
                label="Select sales person"
                value={filters.salesPerson}
                options={SALES_PERSONS as unknown as string[]}
                isOpen={salesOpen}
                onToggle={() => { setSalesOpen((o) => !o); setFabOpen(false); }}
                onSelect={(v) => { update({ salesPerson: v }); setSalesOpen(false); }}
                onClear={() => { update({ salesPerson: null }); setSalesOpen(false); }}
                width="205px"
                placeholderColor="text-CarpeDiemGreyMuted"
                style={filterShadow}
            />

            {/* Export CSV */}
            <button
                onClick={handleExportCSV}
                className="w-[86px] h-[34px] flex items-center justify-center rounded-[6px] border border-CarpeDiemBlueLight bg-white text-[12px] leading-[12px] font-semibold text-CarpeDiemGreyDark hover:bg-CarpeDiemOffWhite transition-colors"
                style={filterShadow}
            >
                Export CSV
            </button>
        </div>
    );
}

// ─── Generic filter dropdown ──────────────────────────────────────────────────
function FilterDropdown({
    label,
    value,
    options,
    isOpen,
    onToggle,
    onSelect,
    onClear,
    width = "auto",
    placeholderColor = "text-CarpeDiemGreyDark",
    style = {},
}: {
    label: string;
    value: string | null;
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (v: string) => void;
    onClear: () => void;
    width?: string;
    placeholderColor?: string;
    style?: React.CSSProperties;
}) {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className={`flex items-center justify-between px-3 h-[34px] rounded-[6px] border border-CarpeDiemBlueLight bg-white text-[13px] leading-[14px] font-normal hover:bg-CarpeDiemOffWhite transition-colors`}
                style={{ width, ...style }}
            >
                <span className={value ? "text-CarpeDiemGreyDark" : placeholderColor}>
                    {value ?? label}
                </span>
                <DownIcon className={`w-3.5 h-3.5 text-CarpeDiemSlate transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div
                    className="absolute z-50 mt-1 bg-white border border-CarpeDiemBlueLight rounded-[6px] py-1 shadow-lg overflow-hidden"
                    style={{ width }}
                >
                    {value && (
                        <button
                            onClick={onClear}
                            className="w-full text-left px-3 py-2 text-[13px] text-CarpeDiemGreyMuted hover:bg-CarpeDiemOffWhite transition-colors italic border-b border-CarpeDiemBlueLight"
                        >
                            Clear selection
                        </button>
                    )}
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => onSelect(opt)}
                            className={`w-full text-left px-3 py-2 text-[13px] leading-[14px] transition-colors hover:bg-CarpeDiemOffWhite ${opt === value
                                ? "text-CarpeDiemGreen font-medium"
                                : "text-CarpeDiemGreyDark"
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}


