"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { toast } from "sonner";
import { LogOut, User as UserIcon, Menu } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { useHydration } from "@/hooks/useHydration";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const isHydrated = useHydration();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    deleteCookie("templas_token", { path: "/" });
    clearAuth();
    toast.success("Berhasil logout!");
    router.push("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-10">
      <div className="flex items-center">
        {/* Tombol menu mobile (Sementara hanya visual) */}
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        {isHydrated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-auto rounded-full pl-2 pr-4 flex items-center gap-2 hover:bg-slate-100">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-semibold text-slate-800 leading-none">{user.username}</span>
                  <span className="text-xs text-slate-500 mt-1 capitalize">{user.role}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Akun Anda</p>
                  <p className="text-xs leading-none text-muted-foreground">
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
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-slate-200"></div>
            <div className="h-8 w-24 rounded-md bg-slate-200"></div>
          </div>
        )}
      </div>
    </header>
  );
}