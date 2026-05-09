'use client';

import { cn } from '@/lib/utils';
import { Beaker, FileText, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Explore Templates', href: '/templates', icon: Beaker }, // Ganti Beaker dengan Search atau Compass jika mau
  { name: 'My Bookmarks', href: '/bookmarks', icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300 md:flex">
      <div className="flex h-16 items-center border-b border-slate-800 px-6 text-xl font-bold tracking-wide text-white">
        <Beaker className="mr-2 h-6 w-6 text-blue-500" />
        Templas V2
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
        {menuItems.map(item => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 group-hover:text-white'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
