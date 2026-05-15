import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon, error, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-CarpeDiemLabel font-proxima font-semibold text-[14px] leading-[14px] tracking-[-0.04em]">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        className={`w-full h-[48px] px-4 py-2 bg-white border ${error ? 'border-red-500' : 'border-CarpeDiemStroke'} rounded-[4px] text-CarpeDiemGreyDark font-proxima font-normal text-[15px] focus:outline-none focus:border-CarpeDiemGreen transition-colors placeholder:text-CarpeDiemMutedBlue/50 ${icon ? 'pr-10' : ''} ${className}`}
                        {...props}
                    />
                    {icon && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-CarpeDiemGrey">
                            {icon}
                        </div>
                    )}
                </div>
                {error && <span className="text-red-500 text-[12px] font-proxima">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
