import { userAuthStore } from "@/store/userAuthStore";

export default function Profile() {
    const user = userAuthStore((state) => state.user);

    return (
        <div className="flex flex-row gap-1">
            <button><img src="/ticket.svg" alt="" /></button>
            <button><img src="/favorite.svg" alt="" /></button>
            <button><img src="/notifications.svg" alt="" /></button>
            <button><img className="w-11 h-11 border border-solid border-black rounded-full" src={user?.avatar_url} alt="User avatar"/></button>            
        </div>
    )
}