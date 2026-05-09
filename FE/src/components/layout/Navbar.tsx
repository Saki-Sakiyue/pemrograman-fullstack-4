'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { toast } from 'sonner';
import { LogOut, User as UserIcon, Menu } from 'lucide-react';

import { useAuthStore } from '@/store/useAuthStore';
import { useHydration } from '@/hooks/common/useHydration';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const router = useRouter();
  const isHydrated = useHydration();
  const user = useAuthStore(state => state.user);
  const clearAuth = useAuthStore(state => state.clearAuth);

  const handleLogout = () => {
    deleteCookie('templas_token', { path: '/' });
    clearAuth();
    toast.success('Berhasil logout!');
    router.push('/login');
  };

  return (
    <header className="z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center">
        {/* Tombol menu mobile (Sementara hanya visual) */}
        <Button variant="ghost" size="icon" className="mr-2 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        {isHydrated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative flex h-10 w-auto items-center gap-2 rounded-full pr-4 pl-2 hover:bg-slate-100"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 font-bold text-blue-700">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="leading-none font-semibold text-slate-800">
                    {user.username}
                  </span>
                  <span className="mt-1 text-xs text-slate-500 capitalize">
                    {user.role}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium">Akun Anda</p>
                  <p className="text-muted-foreground text-xs leading-none">
                    Terdaftar sebagai {user.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Pengaturan Profil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex animate-pulse items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-200"></div>
            <div className="h-8 w-24 rounded-md bg-slate-200"></div>
          </div>
        )}
      </div>
    </header>
  );
}
