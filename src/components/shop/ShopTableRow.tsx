"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { FabJob } from "@/types/shop";
import { ThreeDotsIcon } from "@/components/icons";
import { formatCurrency } from "@/lib/utils/format";

import { useShopStore } from "@/store/useShopStore";

interface ShopTableRowProps {
    job: FabJob;
    selected: boolean;
    onSelect: () => void;
    isLastRow?: boolean;
}

export function ShopTableRow({ job, selected, onSelect, isLastRow }: ShopTableRowProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLTableCellElement>(null);
    const setSelectedJob = useShopStore((state) => state.setSelectedJob);

    // Close menu on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSawOption = (type: "Inside saw" | "Outside saw") => {
        console.log(`Selected: ${type} for FAB ID ${job.fabId}`);
        setMenuOpen(false);
        // TODO: call API / mutation here
    };

    return (
        <tr
            className={`group h-[56px] transition-colors border-b border-CarpeDiemBlueLight hover:bg-CarpeDiemOffWhite ${selected ? "bg-CarpeDiemRowSelected" : "bg-white"
                }`}
        >
            {/* Checkbox */}
            <td className="px-[14px] border-r border-CarpeDiemBlueLight">
                <input
                    type="checkbox"
                    className="w-[18px] h-[18px] rounded border-gray-300 accent-CarpeDiemGreen cursor-pointer"
                    checked={selected}
                    onChange={onSelect}
                />
            </td>

            {/* FAB TYPE */}
            <td className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGreyDark whitespace-nowrap border-r border-CarpeDiemBlueLight">
                <span>{job.fabType}</span>
                {job.isNew && (
                    <span className="ml-2 inline-flex items-center px-[3px] py-[4px] rounded-full text-[10px] leading-[10px] font-normal bg-CarpeDiemSuccessSoft text-CarpeDiemSuccessDark tracking-[-0.03em]">
                        New
                    </span>
                )}
            </td>

            {/* FAB ID — clickable link */}
            <td className="px-[14px] border-r border-CarpeDiemBlueLight">
                <Link
                    href={`/shop/${job.fabId}`}
                    onClick={() => setSelectedJob(job)}
                    className="text-[15px] leading-[15px] font-medium text-CarpeDiemGreyDark hover:underline"
                >
                    {job.fabId}
                </Link>
            </td>

            {/* JOB NO. */}
            <td className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGreyDark border-r border-CarpeDiemBlueLight">{job.jobNo}</td>

            {/* NO. OF PIECES */}
            <td className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGreyDark border-r border-CarpeDiemBlueLight">{job.noOfPieces}</td>

            {/* TOTAL SQ FT */}
            <td className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGreyDark border-r border-CarpeDiemBlueLight">{job.totalSqFt}</td>

            {/* WJ TIME */}
            <td className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGreyDark border-r border-CarpeDiemBlueLight">
                {job.wuTimeMinutes ?? "–"}
            </td>

            {/* CONFIRMED */}
            <td className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGreyDark border-r border-CarpeDiemBlueLight">
                {job.confirmed ?? "–"}
            </td>

            {/* REVENUE */}
            <td className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGreyDark border-r border-CarpeDiemBlueLight">
                {job.revenue != null ? formatCurrency(job.revenue) : "–"}
            </td>

            {/* GP */}
            <td className="px-[14px] text-[15px] leading-[15px] font-normal text-CarpeDiemGreyDark border-r border-CarpeDiemBlueLight">
                {job.gp ?? "–"}
            </td>

            {/* FP COMPLETE */}
            <td className="px-[14px] border-r border-CarpeDiemBlueLight">
                <FpCompleteCell value={job.fpComplete} />
            </td>

            {/* Three-dot actions */}
            <td className="px-[14px] relative" ref={menuRef}>
                <div className="flex justify-center">
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="bg-transparent hover:bg-CarpeDiemOffWhite text-CarpeDiemMutedBlue"
                        aria-label="Row actions"
                    >
                        <ThreeDotsIcon />
                    </button>
                </div>

                {menuOpen && (
                    <div
                        className={`absolute right-2 ${isLastRow ? 'bottom-[100%] mb-1' : 'top-[80%] mt-1'} z-50 bg-white rounded-[16px] py-2 min-w-[140px] overflow-hidden`}
                        style={{ boxShadow: '0 0 0 1px rgba(18, 43, 105, 0.08), 0 1px 2px rgba(18, 43, 105, 0.08)' }}
                    >
                        <Link
                            href={`/shop/${job.fabId}`}
                            onClick={() => {
                                setSelectedJob(job);
                                setMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-[15px] leading-[15px] font-normal text-CarpeDiemGreyDark hover:bg-CarpeDiemOffWhite transition-colors"
                        >
                            View
                        </Link>
                    </div>
                )}
            </td>
        </tr>
    );
}

// ─── FP Complete cell ─────────────────────────────────────────────────────────
function FpCompleteCell({ value }: { value: string | null | undefined }) {
    if (!value || value === "–") return <span className="text-[15px] leading-[15px] text-CarpeDiemGreyMuted">–</span>;
    if (value === "No")
        return <span className="text-[15px] leading-[15px] text-CarpeDiemGreyDark">No</span>;
    // It's a date
    return <span className="text-[15px] leading-[15px] text-CarpeDiemGreyDark">{value}</span>;
}