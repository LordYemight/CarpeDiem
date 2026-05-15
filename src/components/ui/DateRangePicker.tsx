"use client";

import React, { useState, useRef, useEffect } from 'react';
import { DownIcon } from '@/components/icons';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateRangeChange: (startDate: string, endDate: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateRangeChange,
  className = '',
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStart, setSelectedStart] = useState<Date | null>(startDate ? new Date(startDate) : null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(endDate ? new Date(endDate) : null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update internal state when props change
  useEffect(() => {
    setSelectedStart(startDate ? new Date(startDate) : null);
    setSelectedEnd(endDate ? new Date(endDate) : null);
  }, [startDate, endDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric',
      month: 'short'
    });
  };

  const formatDateDisplay = () => {
    if (selectedStart && selectedEnd) {
      return `${formatDate(selectedStart)} - ${formatDate(selectedEnd)}`;
    }
    return 'Date range';
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const handleDateClick = (date: Date) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date);
      setSelectedEnd(null);
    } else if (selectedStart && !selectedEnd) {
      if (date < selectedStart) {
        setSelectedEnd(selectedStart);
        setSelectedStart(date);
      } else {
        setSelectedEnd(date);
      }
    }
  };

  const formatDateForAPI = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleApply = () => {
    if (selectedStart && selectedEnd) {
      onDateRangeChange(
        formatDateForAPI(selectedStart),
        formatDateForAPI(selectedEnd)
      );
      setIsOpen(false);
    }
  };

  const isDateInRange = (date: Date) => {
    if (!selectedStart || !selectedEnd) return false;
    return date >= selectedStart && date <= selectedEnd;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const isDateSelected = (date: Date) => {
    return (selectedStart && isSameDay(date, selectedStart)) || 
           (selectedEnd && isSameDay(date, selectedEnd));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[133px] h-[34px] flex items-center justify-between px-3 rounded-[6px] border border-CarpeDiemBlueLight bg-white text-[13px] leading-[14px] font-normal text-CarpeDiemGreyDark hover:bg-CarpeDiemOffWhite transition-colors focus:outline-none"
        style={style}
      >
        <span className="truncate">{formatDateDisplay()}</span>
        <DownIcon className={`w-3.5 h-3.5 text-CarpeDiemSlate transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 mt-2 p-4 bg-white border border-CarpeDiemBlueLight rounded-[12px] min-w-[280px]"
          style={{ boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          {/* ── Calendar header ── */}
          <div className="flex items-center justify-between mb-4">
            {/* Prev arrow */}
            <button
              onClick={() => navigateMonth('prev')}
              className="flex items-center justify-center hover:bg-CarpeDiemOffWhite rounded-md p-1 text-CarpeDiemGreyDark transition-colors shrink-0"
            >
              <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
                <path d="M4 1L1 4.5L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Month + Year — centered group */}
            <div className="flex-1 flex items-center justify-center gap-1">
              {/* Month select */}
              <select
                value={currentMonth.getMonth()}
                onChange={(e) => {
                  const d = new Date(currentMonth);
                  d.setMonth(parseInt(e.target.value));
                  setCurrentMonth(d);
                }}
                className="appearance-none bg-transparent px-1 py-1 text-[14px] font-semibold text-CarpeDiemGreyDark focus:outline-none cursor-pointer"
                style={{ color: 'var(--color-CarpeDiemGreyDark)' }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={i} style={{ color: 'var(--color-CarpeDiemGreyDark)' }}>
                    {new Date(0, i).toLocaleDateString('en-US', { month: 'long' })}
                  </option>
                ))}
              </select>

              {/* Year select */}
              <select
                value={currentMonth.getFullYear()}
                onChange={(e) => {
                  const d = new Date(currentMonth);
                  d.setFullYear(parseInt(e.target.value));
                  setCurrentMonth(d);
                }}
                className="appearance-none bg-transparent px-1 py-1 text-[14px] font-semibold text-CarpeDiemGreyDark focus:outline-none cursor-pointer"
                style={{ color: 'var(--color-CarpeDiemGreyDark)' }}
              >
                {Array.from({ length: 51 }).map((_, i) => {
                  const y = new Date().getFullYear() - 30 + i;
                  return (
                    <option key={y} value={y} style={{ color: 'var(--color-CarpeDiemGreyDark)' }}>
                      {y}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Next arrow */}
            <button
              onClick={() => navigateMonth('next')}
              className="flex items-center justify-center hover:bg-CarpeDiemOffWhite rounded-md p-1 text-CarpeDiemGreyDark transition-colors shrink-0"
            >
              <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
                <path d="M1 1L4 4.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="p-1 text-center text-[11px] font-medium text-CarpeDiemGreyMuted uppercase tracking-wider">
                {day.charAt(0)}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {days.map((date, index) => (
              <div key={index} className="aspect-square">
                {date ? (
                  <button
                    onClick={() => handleDateClick(date)}
                    className={`w-full h-full rounded-[6px] text-[13px] font-medium transition-colors
                      ${isDateSelected(date) 
                        ? 'bg-CarpeDiemGreen text-white' 
                        : isDateInRange(date)
                        ? 'bg-CarpeDiemRowSelected text-CarpeDiemGreen'
                        : 'text-CarpeDiemGreyDark hover:bg-CarpeDiemOffWhite'
                      }
                    `}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-CarpeDiemBlueLight">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 text-[13px] text-CarpeDiemGreyMuted hover:text-CarpeDiemGreyDark transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!selectedStart || !selectedEnd}
              className="px-4 py-1.5 bg-CarpeDiemGreen text-white text-[13px] font-semibold rounded-[6px] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


