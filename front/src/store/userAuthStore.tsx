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

interface Celebrity {
    id: number;
    celebrity_alias: string;
    id_number: string;
    birthdate: string;
    active_region: string;
    category: string;
    id_image_url: string;
}

interface AuthStore {
    user: User | null;
    celebrity: Celebrity | null;
    token: string | null;
    setUser: (user: User) => void;
    setCelebrity: (celebrity: Celebrity) => void;
    setToken: (token: string) => void;
    logout: () => void;
}

export const userAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            celebrity: null,
            setUser: (user) => set({ user }),
            setCelebrity: (celebrity) => set({ celebrity }),
            setToken: (token) => set({ token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'auth-storage', // nombre en localStorage
        }
    )     
);