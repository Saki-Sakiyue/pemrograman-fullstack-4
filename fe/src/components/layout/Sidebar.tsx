'use client';

import { cn } from '@/lib/utils';
import {
  Beaker,
  FileText,
  LayoutDashboard,
  Users,
  Shield,
  Flag,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useHydration } from '@/hooks/common/useHydration';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Explore Templates', href: '/templates', icon: Beaker },
  { name: 'My Bookmarks', href: '/bookmarks', icon: FileText },
];

const adminMenuItems = [
  { name: 'Manage Users', href: '/admin/users', icon: Users },
  { name: 'Manage Reports', href: '/admin/reports', icon: Flag },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isHydrated = useHydration();
  const user = useAuthStore(state => state.user);

  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300 md:flex">
      <div className="flex h-16 items-center border-b border-slate-800 px-6 text-xl font-bold tracking-wide text-white">
        <Beaker className="mr-2 h-6 w-6 text-blue-500" />
        Templas V2
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
        {/* Regular User Menu */}
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

        {/* Admin Menu - Conditional Rendering */}
        {isHydrated && user?.role === 'admin' && (
          <>
            <div className="my-4 border-t border-slate-700 pt-4">
              <div className="mb-3 flex items-center px-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                <Shield className="mr-2 h-4 w-4 text-red-500" />
                Admin
              </div>
            </div>

            {adminMenuItems.map(item => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
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
          </>
        )}
      </nav>
    </aside>
  );
}
