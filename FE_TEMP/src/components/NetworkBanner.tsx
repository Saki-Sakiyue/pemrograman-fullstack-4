// src/components/NetworkBanner.tsx
'use client';

import { useNetworkStatus } from '@/hooks/common/useNetworkStatus';

export default function NetworkBanner() {
  const isOnline = useNetworkStatus();

  if (isOnline) return null; // Sembunyikan jika online

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-red-600 py-2 text-center font-semibold text-white shadow-md">
      Koneksi terputus. Pastikan internet Anda stabil.
    </div>
  );
}
