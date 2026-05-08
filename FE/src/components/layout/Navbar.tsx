'use client';

import { useHydration } from '@/hooks/useHydration';
import { useAuthStore } from '@/store/useAuthStore';

export default function Navbar() {
  const isHydrated = useHydration();
  const user = useAuthStore(state => state.user);

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="font-semibold text-gray-700 md:hidden">Menu</div>
      <div className="ml-auto flex items-center space-x-4">
        {isHydrated && user ? (
          <div className="text-sm font-medium text-gray-700">
            {user.username} <span className="text-gray-400">({user.role})</span>
          </div>
        ) : (
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200"></div>
        )}
      </div>
    </header>
  );
}
