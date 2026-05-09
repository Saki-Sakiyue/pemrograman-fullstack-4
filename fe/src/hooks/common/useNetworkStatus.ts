// src/hooks/useNetworkStatus.ts
import { useSyncExternalStore } from 'react';

// Mendengarkan event online/offline dari browser
const subscribe = (callback: () => void) => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};

const getClientSnapshot = () => navigator.onLine;

// Server diasumsikan selalu online untuk mencegah UI offline muncul sedetik saat SSR
const getServerSnapshot = () => true;

export const useNetworkStatus = () => {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
};
