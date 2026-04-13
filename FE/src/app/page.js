"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clearToken, getToken, logoutRequest } from "@/lib/auth";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    setIsLoggedIn(Boolean(getToken()));
  }, []);

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch {
      // Tetap clear token di client agar user benar-benar keluar.
    } finally {
      clearToken();
      setIsLoggedIn(false);
      setStatusMessage("Kamu sudah logout.");
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Platform template kamu sudah siap dengan login JWT.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Login pakai username/email + password, simpan token di localStorage, lalu
            logout untuk menghapus sesi client.
          </p>
          {statusMessage ? (
            <p className="rounded-lg bg-emerald-100 px-3 py-2 text-sm text-emerald-700">{statusMessage}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          {!isLoggedIn ? (
            <Link
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
              href="/login"
            >
              Login
            </Link>
          ) : (
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-rose-600 px-5 text-white transition-colors hover:bg-rose-500 md:w-[158px]"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          <Link
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
