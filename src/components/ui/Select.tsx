import React, { useState, useRef, useEffect } from 'react';
import { DownIcon } from "@/components/icons";

interface Option {
    value: string;
    label: string;
    avatar?: string;
}

interface SelectProps {
    label?: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    error?: string;
    withGrayBackground?: boolean;
}

export const Select: React.FC<SelectProps> = ({ 
    label, 
    options, 
    value, 
    onChange, 
    placeholder = "Select option",
    className = "",
    error,
    withGrayBackground = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`flex flex-col gap-1.5 w-full relative ${className}`} ref={containerRef}>
            {label && (
                <label className="text-CarpeDiemLabel font-proxima font-semibold text-[14px] leading-[14px] tracking-[-0.04em]">
                    {label}
                </label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-[48px] px-4 py-2 border rounded-[4px] flex items-center justify-between text-CarpeDiemGreyDark font-proxima font-semibold text-[15px] focus:outline-none transition-colors ${isOpen ? 'border-CarpeDiemStroke bg-white' : (error ? 'border-red-500' : (className.includes('border-') ? '' : 'border-CarpeDiemStroke') + ' ' + (value && withGrayBackground ? 'bg-CarpeDiemCard' : (className.includes('bg-') ? className : 'bg-white')))} ${isOpen ? 'rounded-b-none' : ''}`}
            >
                <div className="flex items-center gap-3">
                    {selectedOption?.avatar && (
                        <img src={selectedOption.avatar} alt="" className="w-6 h-6 rounded-full" />
                    )}
                    <span className={!selectedOption ? 'text-CarpeDiemMutedBlue/50' : ''}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <DownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {error && <span className="text-red-500 text-[12px] font-proxima mt-1">{error}</span>}

            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-t-0 border-CarpeDiemStroke rounded-b-[4px] shadow-lg z-[100] py-1 max-h-[200px] overflow-y-auto custom-scrollbar">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className="w-full px-4 py-2 flex items-center gap-3 hover:bg-CarpeDiemOffWhite text-[#4B545D] font-proxima font-normal text-[15px] transition-colors"
                        >
                            {option.avatar && (
                                <img src={option.avatar} alt="" className="w-6 h-6 rounded-full" />
                            )}
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
