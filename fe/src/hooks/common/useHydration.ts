import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export const useHydration = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // getSnapshot: Dieksekusi di Client (mengembalikan true)
    () => false // getServerSnapshot: Dieksekusi di Server (mengembalikan false)
  );
};
