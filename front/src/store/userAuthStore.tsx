import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    gender: string;
    role: string;
    avatar_url: string;
}

interface AuthStore {
    user: User | null;
    token: string | null;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    logout: () => void;
}

export const userAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'auth-storage', // nombre en localStorage
        }
    )     
);