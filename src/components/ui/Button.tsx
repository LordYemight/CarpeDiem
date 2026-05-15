import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', fullWidth = false, isLoading = false, children, disabled, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center font-proxima font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
        
        const variants = {
            primary: "bg-gradient-to-r from-[#7A9705] to-[#9CC15E] text-white shadow-[0_2px_4px_rgba(122,151,5,0.2)] hover:opacity-90",
            secondary: "bg-white text-CarpeDiemGreyDark border-none shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_rgba(18,43,105,0.08)] rounded-[4px]",
            outline: "border border-CarpeDiemBlueLight bg-transparent text-CarpeDiemGreyDark hover:bg-CarpeDiemOffWhite",
            ghost: "bg-transparent text-CarpeDiemGreyDark hover:bg-CarpeDiemOffWhite"
        };

        const sizes = {
            sm: "h-8 px-3 text-[13px] rounded-[4px]",
            md: "h-11 px-6 text-[15px] leading-[14px] tracking-[-0.04em] rounded-[6px]",
            lg: "h-12 px-8 text-[16px] rounded-[8px]",
            xl: "h-[54px] px-10 text-[18px] rounded-[10px]"
        };

        const widthStyles = fullWidth ? "w-full" : "";

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`}
                {...props}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Loading...</span>
                    </div>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";
