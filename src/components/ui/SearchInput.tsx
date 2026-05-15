'use client';

import React from 'react';
import { SearchIcon, SearchShortcutIcon } from '@/components/icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showSearchIcon?: boolean;
  showShortcut?: boolean;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  showSearchIcon = true,
  showShortcut = false,
  width,
  height,
  className = "",
  style = {},
}: SearchInputProps) => {
  return (
    <div 
      className={`relative bg-white border border-CarpeDiemBorder rounded-[6px] flex items-center ${className}`}
      style={{ 
        width: width || '280px', 
        height: height || '36px',
        padding: '10px 12px',
        ...style 
      }}
    >
      {showSearchIcon && (
        <SearchIcon className="text-CarpeDiemMutedBlue w-4 h-4 flex-shrink-0" />
      )}
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} 
        className={`flex-1 bg-transparent border-none outline-none text-[13px] leading-[14px] font-normal text-CarpeDiemMutedBlue placeholder:text-CarpeDiemMutedBlue ${showSearchIcon ? 'ml-2' : ''}`}
      />
      {showShortcut && (
        <SearchShortcutIcon className="flex-shrink-0 ml-2" />
      )}
    </div>
  );
};
