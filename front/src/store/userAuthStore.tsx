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
            setUser: (user) => {
                set({ user }),
                    document.cookie = `user-role=${JSON.stringify(user.role)}; path=/; max-age=86400`; // Guarda el usuario en las cookies
            },
            setCelebrity: (celebrity) => set({ celebrity }),
            setToken: (token) => {
                set({ token });
                document.cookie = `token=${token}; path=/; max-age=86400`; // Guarda el token en las cookies
            },
            logout: () => {
                set({ user: null, token: null });
                document.cookie = `token=; path=/; max-age=-1`; // Elimina el token de las cookies
                document.cookie = `user-role=; path=/; max-age=-1`; // Elimina el usuario de las cookies

            },
        }),
        {
            name: 'auth-storage', // nombre en localStorage
        }
    )
);