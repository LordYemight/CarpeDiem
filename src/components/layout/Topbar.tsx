'use client';

import React from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  BellIcon,
  MessagesIcon,
  SearchShortcutIcon
} from '@/components/icons';

import { SearchInput } from '@/components/ui/SearchInput';

import { Menu } from 'lucide-react';
import { useSidebarStore } from '@/store/useSidebarStore';

export default function Topbar() {
  const [search, setSearch] = React.useState('');
  const { openSidebar } = useSidebarStore();

  return (
    <header className="h-[80px] bg-white border-b border-CarpeDiemBlueLight flex items-center justify-between md:justify-end px-6 sticky top-0 z-30 gap-4">
      {/* Mobile Menu Button */}
      <button
        onClick={openSidebar}
        className="md:hidden p-2 text-CarpeDiemGreyDark hover:bg-CarpeDiemGrey100 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Search Bar Group */}
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by Cargo, Shipping.."
        showShortcut={true}
        style={{
          boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.05)',
          padding: '10px 6px 10px 12px'
        }}
      />

      {/* Right Actions Group - Hidden on mobile as requested */}
      <div className="hidden md:flex items-center gap-[10px]">
        <button className="w-9 h-9 flex items-center justify-center text-CarpeDiemMutedBlue hover:bg-CarpeDiemGrey100 rounded-full transition-colors">
          <BellIcon className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center text-CarpeDiemMutedBlue hover:bg-CarpeDiemGrey100 rounded-full transition-colors">
          <MessagesIcon className="w-5 h-5" />
        </button>

        {/* Profile Image */}
        <div className="relative w-9 h-9 rounded-full p-[1px] border border-CarpeDiemSuccess bg-CarpeDiemGrey100 flex items-center justify-center ml-1">
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
    </header>
  );
}
