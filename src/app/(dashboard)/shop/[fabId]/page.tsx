'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useShopStore } from '@/store/useShopStore';
import { ShopDetails } from '@/components/shop/ShopDetails';
import { MOCK_JOBS } from '@/lib/constants/jobs';

export default function FabJobDetailPage() {
    const params = useParams();
    const fabId = params.fabId as string;

    const { selectedJob, setSelectedJob } = useShopStore();

    // On mount or if refresh, try to find the job from mock data if not in store
    useEffect(() => {
        if (!selectedJob && fabId) {
            const foundJob = MOCK_JOBS.find(j => j.fabId === fabId);
            if (foundJob) {
                setSelectedJob(foundJob);
            }
        }
    }, [fabId, selectedJob, setSelectedJob]);

    if (!selectedJob) {
        return (
            <div className="p-8">
                <p className="text-CarpeDiemGreyDark">Loading job details for {fabId}...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Shop Header */}
            <div className="px-6 py-8 border-b border-CarpeDiemBlueLight flex flex-col gap-2">
                <h1 className="text-[28px] leading-[32px] font-semibold text-black">
                    {/* {selectedJob.fabId} */}
                </h1>
                <p className="text-[14px] leading-[14px] font-normal text-CarpeDiemGreyMuted">
                    {/* Shop / {selectedJob.fabId} */}
                </p>
            </div>

            {/* Main Content Area */}
            <div className='flex-1'>
                <ShopDetails job={selectedJob} />
            </div>
        </div>
    );
}
