'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Users, UserCircle, Settings, LucideIcon } from 'lucide-react';
import { JobsIcon, ShopIcon } from '@/components/icons';
import { NAV_ITEMS, SidebarItem } from '@/lib/constants/navigation';

const ICON_MAP: Record<string, LucideIcon | React.ComponentType<any>> = {
    'Dashboards': LayoutGrid,
    'Employees': Users,
    'Department': UserCircle,
    'JOBS': JobsIcon,
    'Shop': ShopIcon,
    'Settings': Settings,
};

const MIN_WIDTH = 88;
const MAX_WIDTH = 320;
const DEFAULT_WIDTH = 256;
const COLLAPSE_THRESHOLD = 180;

export default function Sidebar() {
    const pathname = usePathname();
    const [width, setWidth] = useState(DEFAULT_WIDTH);
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing) {
                const newWidth = mouseMoveEvent.clientX;
                if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
                    setWidth(newWidth);
                }
            }
        },
        [isResizing]
    );

    useEffect(() => {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [resize, stopResizing]);

    const navItems = NAV_ITEMS.map((item: SidebarItem) => ({
        ...item,
        icon: item.name ? ICON_MAP[item.name] : undefined
    }));

    const isCollapsed = width < COLLAPSE_THRESHOLD;

    return (
        <div
            className="hidden md:flex h-screen bg-CarpeDiemGreen text-white relative flex-shrink-0 flex-col border-r border-CarpeDiemBlueLight"
            style={{ width: width }}
        >
            {/* Navigation Container */}
            <nav className="flex-1 px-4 py-8 overflow-y-auto custom-scrollbar flex flex-col gap-[10px]">
                {navItems.map((item, index) => {
                    if (item.type === 'header') {
                        return !isCollapsed ? (
                            <div
                                key={item.name}
                                className="text-[16px] leading-[24px] font-semibold text-CarpeDiemMenuText tracking-wider"
                            >
                                {item.name}
                            </div>
                        ) : null;
                    }

                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href || ''));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href || '#'}
                            className={`group relative flex items-center ${isCollapsed ? 'justify-center' : 'gap-[8px]'} px-[12px] h-[48px] rounded-[8px] transition-all duration-200 overflow-hidden whitespace-nowrap ${isActive
                                ? 'bg-fab-moss text-white'
                                : 'text-CarpeDiemBlueLight hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {Icon && (
                                <Icon
                                    size={20}
                                    className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-CarpeDiemBlueLight group-hover:text-white'}`}
                                />
                            )}

                            {!isCollapsed && (
                                <span className={`text-[16px] leading-[24px] ${isActive ? 'font-semibold' : 'font-normal'} flex items-center`}>
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Resize Handle */}
            <div
                className="absolute right-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-white/20 transition-all z-50 flex items-center justify-center group"
                onMouseDown={startResizing}
            >
                <div className={`w-1 h-12 bg-white/20 rounded-full group-hover:bg-white/50 transition-colors ${isResizing ? 'bg-white/60' : ''}`} />
            </div>
        </div>
    );
}




