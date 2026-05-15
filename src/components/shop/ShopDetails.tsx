import React, { useState } from 'react';
import { Button, Modal } from "@/components/ui";
import { FileIcon, PDFIcon, ImageIcon } from "@/components/icons";
import { MOCK_JOB_DETAILS } from "@/lib/constants/jobs";
import type { FabJob, FabJobDetails, DraftingNote, JobFile } from "@/types/shop";
import { ScheduleCuttingForm } from '../forms/shop/ScheduleCuttingForm';

interface ShopDetailsProps {
    job: FabJob;
}

export function ShopDetails({ job }: ShopDetailsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const details: FabJobDetails = MOCK_JOB_DETAILS[job.fabId] || MOCK_JOB_DETAILS.default;

    const renderFileIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <PDFIcon />;
            case 'jpg': return <ImageIcon />;
            default: return <FileIcon />;
        }
    };

    const handleScheduleSubmit = (data: any) => {
        console.log('Form submitted:', data);
        setIsModalOpen(false);
        // Add API call here
    };

    return (
        <div className="flex flex-col lg:flex-row bg-white min-h-[750px] rounded-[12px] overflow-hidden">
            {/* Left Sidebar - 286px fixed on desktop */}
            <div className="w-full lg:w-[286px] bg-CarpeDiemOffWhite p-6 flex flex-col gap-8 border-b lg:border-b-0 lg:border-r border-CarpeDiemBlueLight">
                <div>
                    <h2 className="text-CarpeDiemBlackDeep font-inter font-semibold text-[20px] leading-[28px] mb-4">Job Details</h2>
                    <div className="flex flex-col gap-1">
                        <span className="text-CarpeDiemGrey font-proxima font-normal text-[14px] leading-[20px]">Slab smith used?</span>
                        <span className="text-CarpeDiemGreyDark font-proxima font-semibold text-[16px] leading-[24px]">No</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-CarpeDiemGreyDark font-proxima font-semibold text-[16px] leading-[14px] tracking-[-0.02em]">Drafting notes</h3>
                    <div className="flex flex-col gap-6">
                        {details.draftingNotes.map((note: DraftingNote) => (
                            <div key={note.id} className="flex gap-3">
                                <img src={note.avatar} alt={note.author} className="w-8 h-8 rounded-full border border-CarpeDiemBorder" />
                                <div className="flex flex-col gap-1">
                                    <p className="text-black font-proxima font-normal text-[12px] leading-[16px]">{note.text}</p>
                                    <span className="text-CarpeDiemGrey font-proxima font-normal text-[12px] leading-[16px]">{note.author} • {note.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 sm:p-8 flex flex-col">
                {/* Header Info */}
                <div className="mb-10">
                    <h1 className="text-black font-proxima font-semibold text-[16px] leading-[24px] mb-1">{job.fabId}</h1>
                    <p className="text-black font-proxima font-normal text-[14px] leading-[20px]">{details.description}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 mb-5 pb-5 border-b border-CarpeDiemBlueLight">
                    <DetailItem label="Job #" value={job.jobNo.toString()} />
                    <DetailItem label="FAB type" value={job.fabType} />
                    <DetailItem label="Account" value={details.account} />
                    <DetailItem label="Area (s)" value={details.area} />
                    <DetailItem label="Stone color" value={details.stoneColor} />

                    <DetailItem label="Stone type" value={details.stoneType} />
                    <DetailItem label="Stone thickness" value={details.stoneThickness} />
                    <DetailItem label="Edge" value={details.edge} />
                    <DetailItem label="WJ LinFt" value={details.wjLinFt} />
                    <DetailItem label="No. of pieces" value={job.noOfPieces.toString()} />

                    <DetailItem label="Total Sq Ft" value={job.totalSqFt.toString()} />
                    <DetailItem label="Edge L.F." value={details.edgeLF} />
                    <DetailItem label="CNC LinFt" value={details.cncLinFt} />
                    <DetailItem label="Miter LinFt" value={details.miterLinFt} />
                </div>

                {/* Uploaded Files */}
                <div className="flex-1 border border-CarpeDiemBorder rounded-[12px] p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-black font-proxima font-semibold text-[14px] leading-[20px]">Uploaded files</h3>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {details.files.map((file: JobFile) => (
                            <div key={file.id} className="w-full sm:w-[209px] h-[140px] border border-CarpeDiemStroke rounded-[8px] p-4 flex flex-col relative bg-white hover:border-CarpeDiemGreen transition-colors group cursor-pointer">
                                <div className="mb-2">
                                    {renderFileIcon(file.type)}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-black font-proxima font-semibold text-[14px] leading-[20px] truncate">{file.name}</span>
                                    <span className="text-CarpeDiemGrey font-proxima font-normal text-[12px] leading-[16px]">{file.size}</span>
                                </div>
                                <button className="absolute bottom-4 right-4 text-CarpeDiemGreen font-proxima font-semibold text-[14px] leading-[14px] tracking-[-0.02em] underline hover:text-CarpeDiemGreenHover transition-colors">
                                    Open file
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8 flex justify-end">
                    <Button
                        variant="primary"
                        className="w-full sm:w-[189px]"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Schedule for cutting
                    </Button>
                </div>
            </div>

            {/* Schedule Cutting Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Schedule cutting"
            >
                <ScheduleCuttingForm
                    job={job}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleScheduleSubmit}
                />
            </Modal>
        </div>
    );
}

function DetailItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-CarpeDiemGrey font-proxima font-normal text-[14px] leading-[14px]">{label}</span>
            <span className="text-CarpeDiemGreyDark font-proxima font-semibold text-[16px] leading-[28px]">{value}</span>
        </div>
    );
}