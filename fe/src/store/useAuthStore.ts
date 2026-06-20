import { UserProfile } from '@/types/auth.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      setUser: user => set({ user, isAuthenticated: true }),
      updateUser: (updates) =>
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      clearAuth: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
