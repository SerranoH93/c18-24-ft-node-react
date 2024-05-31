import { userAuthStore } from "@/store/userAuthStore";

export default function Profile() {
    const user = userAuthStore((state) => state.user);

    return (

        <div>
            <img src={user?.avatar_url} alt="User avatar" />
        </div>
        

    )
}