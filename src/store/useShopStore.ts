import { create } from 'zustand';
import { FabJob } from '@/types/shop';

interface ShopState {
    selectedJob: FabJob | null;
    setSelectedJob: (job: FabJob | null) => void;
}

export const useShopStore = create<ShopState>((set) => ({
    selectedJob: null,
    setSelectedJob: (job) => set({ selectedJob: job }),
}));
