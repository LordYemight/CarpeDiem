'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutGrid, Users, UserCircle, Settings, LucideIcon } from 'lucide-react';
import { JobsIcon, ShopIcon, BellIcon, MessagesIcon } from '@/components/icons';
import { NAV_ITEMS, SidebarItem } from '@/lib/constants/navigation';
import { useSidebarStore } from '@/store/useSidebarStore';

const ICON_MAP: Record<string, LucideIcon | React.ComponentType<any>> = {
    'Dashboards': LayoutGrid,
    'Employees': Users,
    'Department': UserCircle,
    'JOBS': JobsIcon,
    'Shop': ShopIcon,
    'Settings': Settings,
};

export default function MobileSidebar() {
    const pathname = usePathname();
    const { isOpen, closeSidebar } = useSidebarStore();

    const navItems = NAV_ITEMS.map((item: SidebarItem) => ({
        ...item,
        icon: item.name ? ICON_MAP[item.name] : undefined
    })).filter(item => item.type !== 'header');

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-black/50 z-[60] md:hidden"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 w-[280px] bg-CarpeDiemGreen text-white z-[70] md:hidden flex flex-col shadow-2xl"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <span className="text-xl font-bold font-inter tracking-tight uppercase">Menu</span>
                            <button
                                onClick={closeSidebar}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="px-6 py-4 border-b border-white/10 flex flex-col gap-4">
                            {/* Actions in sidebar (Hidden from Topbar on mobile) */}
                            <div className="flex items-center gap-4">
                                <button className="w-10 h-10 flex items-center justify-center text-CarpeDiemBlueLight hover:bg-white/10 rounded-full transition-colors relative">
                                    <BellIcon className="w-5 h-5" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-CarpeDiemGreen"></span>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center text-CarpeDiemBlueLight hover:bg-white/10 rounded-full transition-colors">
                                    <MessagesIcon className="w-5 h-5" />
                                </button>

                                {/* Profile Image - Now closer to icons */}
                                <div className="relative w-9 h-9 rounded-full p-[1px] border border-white/20 bg-white/10 flex items-center justify-center">
                                    <div className="w-full h-full rounded-full overflow-hidden relative">
                                        <Image
                                            src="/profile-image.jpg"
                                            alt="User profile"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <nav className="flex-1 px-4 py-8 overflow-y-auto custom-scrollbar flex flex-col gap-[10px]">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href || ''));
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href || '#'}
                                        onClick={closeSidebar}
                                        className={`group relative flex items-center gap-[12px] px-[12px] h-[48px] rounded-[8px] transition-all duration-200 ${isActive
                                            ? 'bg-fab-moss text-white shadow-lg'
                                            : 'text-CarpeDiemBlueLight hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {Icon && (
                                            <Icon
                                                size={20}
                                                className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-CarpeDiemBlueLight group-hover:text-white'}`}
                                            />
                                        )}
                                        <span className={`text-[16px] leading-[24px] ${isActive ? 'font-semibold' : 'font-normal'}`}>
                                            {item.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
