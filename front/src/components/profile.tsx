import { userAuthStore } from "@/store/userAuthStore";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Profile() {
    const user = userAuthStore((state) => state.user);
    const logout = userAuthStore((state) => state.logout);

    const router = useRouter();
    //* Maneja el logout
    const handleLogout = () => {
        logout();
        router.refresh(); //recarga la pagina para que se actualice el estado global
    }

    return (
        <div className="flex flex-row gap-1">
            <button><img src="/ticket.svg" alt="" /></button>
            <button><img src="/favorite.svg" alt="" /></button>
            <button><img src="/notifications.svg" alt="" /></button>
            <Popover placement="bottom-end" backdrop="opaque" classNames={{
                content: "bg-[#222223] rounded-2xl",
            }}>
                <PopoverTrigger>
                    <button><img className="w-11 h-11 border border-solid border-black rounded-full" src={user?.avatar_url} alt="User avatar" /></button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-1.5 px-4 py-3">
                        <p className="text-center text-white text-lg">Hola {user?.first_name}</p>
                        <button className="w-full h-8 px-6 py-2 bg-white text-center rounded-full">Editar perfil</button>
                        <button className="w-full h-8 px-6 py-2 bg-white text-center rounded-full" onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}