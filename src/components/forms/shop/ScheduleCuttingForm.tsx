import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select } from "@/components/ui";
import { CalendarIcon } from "@/components/icons";
import { FabJob } from "@/types/shop";
import { useToastStore } from '@/store/useToastStore';
import { scheduleCuttingSchema, ScheduleCuttingFormValues } from "@/lib/validations/shop";

interface ScheduleCuttingFormProps {
    job: FabJob;
    onClose: () => void;
    onSubmit: (data: ScheduleCuttingFormValues) => void;
}

const WORKSTATIONS = [
    { value: 'cutting', label: 'Cutting' },
    { value: 'polishing', label: 'Polishing' },
    { value: 'cnc', label: 'CNC' }
];

const OPERATORS = [
    { value: 'mike', label: 'Mike Rodriguez', avatar: 'https://i.pravatar.cc/150?u=mike' },
    { value: 'sarah', label: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { value: 'john', label: 'John Smith', avatar: 'https://i.pravatar.cc/150?u=john' }
];

export function ScheduleCuttingForm({ job, onClose, onSubmit }: ScheduleCuttingFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addToast = useToastStore(state => state.addToast);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ScheduleCuttingFormValues>({
        resolver: zodResolver(scheduleCuttingSchema),
        defaultValues: {
            workstation: 'cutting',
            operator: 'mike',
            hours: '',
            date: '',
        },
    });

    const onFormSubmit = async (data: ScheduleCuttingFormValues) => {
        setIsSubmitting(true);

        // Simulate API call with 2s delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        addToast(
            "Cutting scheduled successful",
            "Your cutting schedule was updated successfully"
        );

        onSubmit(data);
        setIsSubmitting(false);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col w-full">
            {/* Header info */}
            <div className="flex flex-col gap-1 mb-8">
                <h2 className="text-black font-proxima font-semibold text-[16px] leading-[24px]">
                    {job.fabId}
                </h2>
                <p className="text-black font-proxima font-normal text-[14px] leading-[20px]">
                    Conference Table - Quartz
                </p>
            </div>

            {/* Middle Section with border */}
            <div className="pt-5 border-t border-CarpeDiemBlueLight mx-[-24px] px-6 flex flex-col gap-5 mb-5">
                <div className="grid grid-cols-2 gap-5">
                    <Controller
                        name="workstation"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Select workstation"
                                options={WORKSTATIONS}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.workstation?.message}
                            />
                        )}
                    />
                    <Input
                        label="Hours scheduled"
                        type="number"
                        placeholder="Enter hour"
                        className="hide-spin-buttons"
                        {...register('hours')}
                        error={errors.hours?.message}
                    />
                </div>

                <Input
                    label="Schedule date"
                    placeholder="mm/dd/yyyy"
                    type="date"
                    className="hide-calendar-icon"
                    {...register('date')}
                    error={errors.date?.message}
                    icon={<CalendarIcon className="w-5 h-5" />}
                    onClick={(e) => e.currentTarget.showPicker()}
                />
            </div>

            <div className="mb-8">
                <Controller
                    name="operator"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Assigned operator"
                            placeholder="Select operator"
                            options={OPERATORS}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.operator?.message}
                            withGrayBackground
                        />
                    )}
                />
            </div>

            {/* Footer actions */}
            <div className="flex justify-end gap-3 mt-4">
                <Button
                    variant="secondary"
                    onClick={onClose}
                    className="w-[124px]"
                    type="button"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    className="w-[189px]"
                    isLoading={isSubmitting}
                >
                    Schedule for cutting
                </Button>
            </div>
        </form>
    );
}
