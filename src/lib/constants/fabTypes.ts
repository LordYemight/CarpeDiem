export const FAB_TYPES = ["Standard", "Premium", "Custom"] as const;

export type FabType = (typeof FAB_TYPES)[number];
