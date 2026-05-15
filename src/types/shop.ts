// types/shop.ts
export type FabType = "Standard" | "Premium" | "Custom";
export type SawType = "Inside saw" | "Outside saw";
export type SortDirection = "asc" | "desc" | null;

export interface FabJob {
    id: string;
    fabId: string;
    fabType: FabType;
    jobNo: number;
    noOfPieces: number;
    totalSqFt: number;
    wuTimeMinutes: number | null;
    confirmed: string | null;   // date string e.g. "9/10/2025"
    revenue: number | null;
    gp: number | null;
    fpComplete: string | null;  // date string or "No"
    isNew?: boolean;
}

export interface ShopFilters {
    search: string;
    dateRange: { from: string; to: string };
    fabType: string | null;
    salesPerson: string | null;
}

export interface CuttingSchedule {
    workstation: string;
    hoursScheduled: number;
    scheduleDate: string;
    assignedOperatorId: string;
    sawType?: SawType;
}

export interface Employee {
    id: string;
    name: string;
    avatarUrl?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}

export interface DraftingNote {
    id: number;
    author: string;
    time: string;
    text: string;
    avatar: string;
}

export interface JobFile {
    id: number;
    name: string;
    size: string;
    type: string;
}

export interface FabJobDetails {
    account: string;
    area: string;
    stoneColor: string;
    stoneType: string;
    stoneThickness: string;
    edge: string;
    wjLinFt: string;
    edgeLF: string;
    cncLinFt: string;
    miterLinFt: string;
    description: string;
    draftingNotes: DraftingNote[];
    files: JobFile[];
}